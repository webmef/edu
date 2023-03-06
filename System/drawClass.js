class drawClass {
    constructor() {
        this.isDrawing = false
        this.isPossibleToDrawing = false

        //posições do retangulo de seleção
        this.inicialX
        this.inicialY

        //factor of force
        this.factorForce = 0.3
        this.lengthForce = 1
        this.forceType

        //factor of support
        this.factorSupport = 0.3
        this.supportType
    }

    drawForce() {
        for (var j = 0; j < _model.m_points.length; j++) {
            if (_model.m_points[j].drawForce) {
                switch (this.forceType) {
                    case 'VERTICAL':
                        var Px = _model.m_points[j].m_x1
                        var Py = -_model.m_points[j].m_y1
                        push()
                        fill(0, 0, 255)
                        stroke(0, 0, 255);
                        triangle(Px, Py, Px - this.factorForce, Py - this.factorForce, Px + this.factorForce, Py - this.factorForce)
                        line(Px, Py, Px, Py - this.lengthForce)
                        pop()
                        break
                    case 'HORIZONTAL':
                        var Px = _model.m_points[j].m_x1
                        var Py = -_model.m_points[j].m_y1
                        push()
                        fill(0, 0, 255)
                        stroke(0, 0, 255);
                        triangle(Px, Py, Px - this.factorForce, Py - this.factorForce, Px - this.factorForce, Py + this.factorForce)
                        line(Px, Py, Px - this.lengthForce, Py)
                        pop()
                        break
                    default:
                        window.alert(`tIPO DE FORÇA INCORRETA, NO MOMENTO EXISTEM APENAS OS TIPOS VERTICAL E HORIZONTAL`);
                }

            }
        }
    }

    drawSupport() {
        for (var j = 0; j < _model.m_points.length; j++) {
            if (_model.m_points[j].drawSupport) {
                switch (_model.m_points[j].typeSuportToDraw) {
                    case 'PRIMEIROGENERO':
                        var Px = _model.m_points[j].m_x1
                        var Py = -_model.m_points[j].m_y1
                        push()
                        fill(0, 150, 0)
                        stroke(0, 150, 0);
                        triangle(Px, Py, Px + this.factorSupport, Py + this.factorSupport, Px - this.factorSupport, Py + this.factorSupport)
                        line(Px - this.factorSupport, Py + 1.5 * this.factorSupport, Px + this.factorSupport, Py + 1.5 * this.factorSupport)
                        pop()
                        break
                    case 'SEGUNDOGENERO':
                        var Px = _model.m_points[j].m_x1
                        var Py = -_model.m_points[j].m_y1
                        push()
                        fill(0, 150, 0)
                        stroke(0, 150, 0);
                        triangle(Px, Py, Px + this.factorSupport, Py + this.factorSupport, Px - this.factorSupport, Py + this.factorSupport)
                        pop()
                        break
                    case 'TERCEIROGENERO':
                        var Px = _model.m_points[j].m_x1
                        var Py = -_model.m_points[j].m_y1
                        push()
                        fill(0, 150, 0)
                        stroke(0, 150, 0);
                        line(Px + this.factorSupport, Py + 0.8 * this.factorSupport, Px + this.factorSupport, Py - 2.0 * this.factorSupport)
                        line(Px + 2.5 * this.factorSupport, Py + this.factorSupport, Px + 1.0 * this.factorSupport, Py - this.factorSupport)
                        line(Px + 2.5 * this.factorSupport, Py - 0.1 * this.factorSupport, Px + 1.0 * this.factorSupport, Py - 1.8 * this.factorSupport)
                        line(Px + 2.5 * this.factorSupport, Py + 1.8 * this.factorSupport, Px + 1.0 * this.factorSupport, Py - 0.1 * this.factorSupport)
                        pop()
                        break
                    default:
                        window.alert(`SUPORT INEXISTENTE`);

                }
            }
        }
    }

    drawRectangleOfSelection() {
        noFill()
        stroke('red')
        rect(this.inicialX, -this.inicialY, control.dx - this.inicialX, -(control.dy - this.inicialY));
    }

    getBoundBoxRatangleSelection(x, y) {

        var xmin = this.inicialX
        var xmax = control.dx
        var ymin = this.inicialY
        var ymax = control.dy
        console.log(xmin, ymin)
        console.log(xmax, ymax)


        if (x > xmin && x < xmax) {
            if (y > ymin && y < ymax) {
                return true
            }
        }

        return false
    }

    //desenha o resultado do deslocamento
    displacementResults() {


        push()
        var k = 0
        var j = 0
        stroke('blue')
        beginShape(LINES);      
        for (var i = 0; i < _model.m_curves.length; i++) {


            var dx = control.struct.Uestr[k]
            k++
            var dy = control.struct.Uestr[k]
            k++
 
            if (dx == 0) {
                dx = 0
            } else if (dx > 0) {
                dx = 0.5
            } else {
                dx = -0.5
            }

            if (dy == 0) {
                dy = 0
            } else if (dy > 0) {
                dy = 0.5
            } else {
                dy = -0.5
            } 
            
            //console.log(_model.m_verts[j].y)
            vertex(_model.m_verts[j].x + control.displacementVectorControl[j].x/10, _model.m_verts[j].y - control.displacementVectorControl[j].y/10)  
            j++
            vertex(_model.m_verts[j].x + control.displacementVectorControl[j].x/10, _model.m_verts[j].y - control.displacementVectorControl[j].y/10) 

        }
        endShape();
        pop()

    }
}