export class DynamicDiagrams {
    constructor(selector, svg, data, center = { x: null, y: null }, positions = { left: null, right: null, top: null }) {
        this.svg = svg;
        this.data = data;
        this.selector = selector;
        const container = d3.select(this.selector).node();
        this.width = container.clientWidth;
        this.height = container.clientHeight;

        if (this.width === 0 || this.height === 0) {
            console.log(this.width, this.hieght);
            console.error("El contenedor debe tener una anchura y altura mayores a cero");
            return;
        }
        this.data = data;
        this.positions = positions;

        center.x = null;
        center.y = null;

        if (positions.left !== null) {
            center.x = positions.left;
        }
        if (positions.right !== null) {
            center.x = this.width - positions.right;
        }

        if (positions.top !== null) {
            center.y = positions.top;
        }



        this.center = center;
        this.isDragging = false;
        this.simulation = null;
        this.setup();
    }

    setup() {

        this.data.nodes.forEach((node, index) => {
            node.uniqueIndex = index;
            if (node.type !== 'main-node') {
                node.x = this.center.x + Math.cos(node.angle) * node.distance;
                node.y = this.center.y + Math.sin(node.angle) * node.distance;
            } else {
                node.x = this.center.x;
                node.y = this.center.y;
            }
        });

        this.data.links.forEach(link => {
            const sourceNode = this.data.nodes.find(node => node.id === link.source);
            const targetNode = this.data.nodes.find(node => node.id === link.target);
            if (!sourceNode || !targetNode) {
                console.error('Uno de los nodos para el enlace no se encuentra:', link);
            } else {
                link.distance = sourceNode.distance + targetNode.distance;
            }
        });

        this.data.nodes.forEach(node => {
            if (node.type === 'main-node') {
                node.fx = this.center.x;
                node.fy = this.center.y;
            }
        });
        const linkForce = d3.forceLink(this.data.links)
            .id(d => d.id)
            .distance(d => d.distance)
            .strength(1);

        this.simulation = d3.forceSimulation(this.data.nodes)
            .force("link", d3.forceLink(this.data.links).id(d => d.id).distance(d => d.distance).strength(1))
            .force("charge", d3.forceManyBody().strength(d => d.type === 'main-node' ? -500 : -50))
            .alpha(0.3)
            .alphaMin(0.02)
            .alphaDecay(0.1)

        const link = this.svg.append("g")
            .selectAll("line")
            .data(this.data.links)
            .join("line")
            .attr("stroke", "#999")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = this.svg.append("g")
            .selectAll("foreignObject")
            .data(this.data.nodes)
            .join("foreignObject")
            .html(d => d.type != 'main-node' ? `<a href="${d.url}" class="node-content ${d.class}">${d.id}</a>` : `<div class="node-content ${d.class}">${d.id}</div>:`)
            .call(d3.drag()
                .on("start", (event, d) => this.dragstarted(event, d))
                .on("drag", (event, d) => this.dragged(event, d))
                .on("end", (event, d) => this.dragended(event, d)));


        node.each(function (d) {
            const div = this.querySelector(".node-content");
            if (div) {
                const bbox = div.getBoundingClientRect();
                d3.select(this)
                    .attr("width", bbox.width)
                    .attr("height", bbox.height)
                    .attr("x", d.x - bbox.width / 2)
                    .attr("y", d.y - bbox.height / 2);
            }
        });


        const self = this;


        function updateNodePositions() {
            node.each(function (d) {
                const div = this.querySelector(".node-content");
                const bbox = div.getBoundingClientRect();
                d.width = bbox.width;
                d.height = bbox.height;

                d3.select(this)
                    .attr("x", d.x - d.width / 2)
                    .attr("y", d.y - d.height / 2);
            });

            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        }

        updateNodePositions();
        this.simulation.on("tick", () => {
            const amplitude = 0.2;
            const frequency = /*0.4;*/0.4
            const phaseShift = 0.05;

            node.each(function (d) {
                if (d.type === 'child-node' && !d.isDragging) {

                    d.angle += phaseShift * Math.cos(Date.now() / /*5000*/10000 + d.uniqueIndex * frequency);


                    d.x += amplitude * Math.cos(d.angle);
                    d.y += amplitude * Math.sin(d.angle);
                }
            });

            if (this.simulation.alpha() < 0.1) {
                this.simulation.alpha(0.2).restart();
            }

            node
                .attr("x", d => d.x - d.width / 2)
                .attr("y", d => d.y - d.height / 2);
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        });


    }

    dragstarted(event) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;


    }
    dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
        if (event.subject.type === 'main-node') {
            this.data.links.forEach(link => {
                if (link.source.id === event.subject.id || link.target.id === event.subject.id) {
                    link.distance *= 0.9986;
                }
            });

            this.simulation.force("link").distance(link => link.distance);
            this.simulation.alpha(0.3).restart();
        }

    }
    dragended(event) {
        if (!event.active) this.simulation.alphaTarget(0.1);
        if (event.subject.type === 'main-node') {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        } else {
            event.subject.fx = null;
            event.subject.fy = null;
            this.data.links.forEach(link => {
                if (link.source.id === event.subject.id || link.target.id === event.subject.id) {
                    const sourceNode = this.data.nodes.find(node => node.id === link.source.id);
                    const targetNode = this.data.nodes.find(node => node.id === link.target.id);
                    const dx = targetNode.x - sourceNode.x;
                    const dy = targetNode.y - sourceNode.y;
                    const currentDistance = Math.sqrt(dx * dx + dy * dy) + 35;
                    link.distance = currentDistance;
                }
            });

            // Aplicar suavemente los cambios a la simulación
            this.simulation.force("link").initialize(this.data.nodes); // Re-inicializar las fuerzas de enlace con los nodos actualizados
            this.simulation.alpha(0.3).restart(); // Ligeramente aumenta alpha para una transición suave


        }
    }
}

