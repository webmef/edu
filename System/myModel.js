class myModel {
    constructor() {

        //vector of points
        this.m_verts = [] //armazenas as coordenadas de pontos para facilitar na criação dos elementos
        this.m_points = [] //armazenas os objetos de pontos
        this.m_vcolors = []
        this.m_curves = [] //armazena as curvas em geral
        this.numberOfcurvers = 0

        //flag
        this.geometry = true
        this.mesh = false
    }

    showModel() {

        if (this.m_curves.length >= 1) {   
            for (var i = 0; i < this.m_curves.length; i++) {
                push() 
                this.changeColorMesh(this.m_curves[i].selected)              
                this.m_curves[i].drawCurve()
                pop()
                
                push()  
                this.changeColorMesh()
                this.showNodes()
                pop()
            }
        }
    }

    changeColorMesh(flag){
        if (this.geometry){
            if(flag){
                stroke('red')
            }else{                         
                stroke('black')
            }     
        }
        if (this.mesh){
            if(flag){
                stroke('red')
            }else{                         
                stroke(255, 255, 0)
            }                 
        } 
       
    }

    showNodes() {
        for (var j = 0; j < this.m_verts.length; j++){
            strokeWeight(5);
            beginShape(POINTS);
            this.pointSelected(j)
            vertex(this.m_verts[j].x, this.m_verts[j].y);
            endShape();
        }
    }

    pointSelected(j){      
        
        if (this.geometry){
            if(this.m_points[j].selected){
                stroke('red')
            }else{                         
                stroke('black')
            }         
        }
        if (this.mesh){
            if(this.m_points[j].selected){
                stroke('red')
            }else{                         
                stroke('black')
            }               
        }         
    }

    deleteShape(){
        for (var i = 0; i < this.m_curves.length; i++) {
            print()
            if(this.m_curves[i].isSelected){
                this.m_curves[i].pop()
            }
        }
    }

    deletePoint(positionPoint){
        var vector = []
        var j = 0
        for (var i = 0; i < this.m_curves.length; i++) {
            if(positionPoint != i){
                vector[j] = this.m_verts[i]
                j++
            } 
        }

        this.m_verts = []

        for (var i = 0; i < this.m_curves.length; i++) {
                this.m_verts[i] = vector[i]
        }

    }

    getBoundBox(_left, _right, _bottom, _top) {
        let boundBoxVector = []
        if (this.m_verts.length < 1 || this.m_curves.length < 1) {
            let _xmin = -1
            let _xmax = 9
            let _ymin = 1
            let _ymax = -9
            boundBoxVector.push(createVector(_xmin, _ymin))
            boundBoxVector.push(createVector(_xmax, _ymax))
            return boundBoxVector;
        }

        let _xmin = this.m_verts[0].x
        let _xmax = _xmin
        let _ymin = this.m_verts[0].y
        let _ymax = _ymin

        for (var i = 1; i < this.m_verts.length; i++) {
            if (this.m_verts[i].x < _xmin)
                _xmin = this.m_verts[i].x;

            if (this.m_verts[i].x > _xmax)
                _xmax = this.m_verts[i].x;

            if (this.m_verts[i].y > _ymin)
                _ymin = this.m_verts[i].y;

            if (this.m_verts[i].y < _ymax)
                _ymax = this.m_verts[i].y;
        }

        boundBoxVector.push(createVector(_xmin, _ymin))
        boundBoxVector.push(createVector(_xmax, _ymax))

        return boundBoxVector
    }


}