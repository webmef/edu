class myControler {
    constructor(view) {
        //mouse position
        this.mouseInCanvas = true
        this.precision = 1
        this.dx = round(0.0, this.precision)
        this.dy = round(0.0, this.precision)
        this.cursor2D = cursor(CROSS)
        this.view = view
        this.isSnap = true
        this.gridX = 1
        this.gridY = 1
        this.isGrid = true


        //Line Button
        this.statusLineButton = false
        this.typeClickLine = ''

        //curve type
        this.curveType = ''

        //point button        
        this.statusPointButton = false

        this.PmouseX = document.getElementById("PmouseX")
        this.PmouseY = document.getElementById("PmouseY")

        //structure object
        this.elementIdentificator = []
        this.struct = new structure()

        //displacement results
        this.drawDisplacementResult = false //flag
        this.displacementVectorControl = [] //vetor de resultados de deslocamento

    }

    show() {
        background(204, 227, 232);
        //background(255, 0, 0);

        if (this.isGrid) {
            this.makeDisplaygrid(view)
        }

        if (_objectOfDrawing.isDrawing) {
            _objectOfDrawing.drawRectangleOfSelection()
        }

        _objectOfDrawing.drawForce()
        _objectOfDrawing.drawSupport()

        if (this.drawDisplacementResult) {
            _objectOfDrawing.displacementResults()
        }

        _model.showModel()
        view.camera()
    }

    //position in the new scale with origin in the same position of the camera world
    mousePosition() {

        this.dx = round(((mouseX / width) * (view._right - view._left) + view._left), this.precision)
        this.dy = round(((mouseY / height) * (view._bottom - view._top) + view._top), this.precision)


        if (this.mouseInsideCanvas()) {
            //snap
            if (this.isSnap) {
                let snap = []
                snap = this.snapTo()
                this.dx = snap[0].x
                this.dy = snap[0].y
            }

            //drawing in the label
            this.PmouseX.textContent = `X: ${this.dx}`
            this.PmouseY.textContent = `Y: ${this.dy}`
        }

    }

    mouseCursor(type) {
        this.cursor2D = cursor(type)
        //colocar estes cursores na situação escolhida.
        /*       this.cursor2D = cursor()
              this.cursor2D = cursor(ARROW)
              this.cursor2D = cursor(CROSS)
              this.cursor2D = cursor(HAND)
              this.cursor2D = cursor(MOVE)
              this.cursor2D = cursor(TEXT)
              this.cursor2D = cursor(WAIT) */
    }

    mouseInsideCanvas() {
        if (this.dx >= this.view._right
            || this.dx <= this.view._left ||
            this.dy >= this.view._top ||
            this.dy <= this.view._bottom) {

            this.mouseInCanvas = false

        } else {
            this.mouseInCanvas = true
        }

        return this.mouseInCanvas
    }


    origin(oX, oY) {
        //create origin 
        push()
        let x, y
        stroke('white')
        strokeWeight(3)
        beginShape(LINES)
        x = oX - this.gridX * 0.2
        y = oX
        vertex(x, y, 0)
        x = oX + this.gridX * 0.2
        y = oX
        vertex(x, y, 0)
        endShape()

        beginShape(LINES)
        x = oX
        y = oY - this.gridY * 0.2
        vertex(x, y, 0)
        x = oX
        y = oY + this.gridY * 0.2
        vertex(x, y, 0)
        endShape()
        pop()
    }

    makeDisplaygrid(view) {
        push()
        let oX = 0
        let oY = 0
        let x = 0
        let y


        //points to make a grid
        beginShape(POINTS)
        stroke(0)
        strokeWeight(1.5)
        while (x >= view._left) {
            y = 0
            while (y >= view._bottom) {
                vertex(x, -y)
                y -= this.gridY
            }
            x -= this.gridX
        }

        x = 0
        while (x <= view._right) {
            y = 0
            while (y >= view._bottom) {
                vertex(x, -y)
                y -= this.gridY
            }
            x += this.gridX
        }

        x = 0
        while (x <= view._right) {
            y = 0
            while (y <= view._top) {
                vertex(x, -y)
                y += this.gridY
            }
            x += this.gridX
        }

        x = 0
        while (x >= view._left) {
            y = 0
            while (y <= view._top) {
                vertex(x, -y)
                y += this.gridY
            }
            x -= this.gridX
        }

        endShape()

        this.origin(oX, oY)

        pop()
    }


    setGrid(gridx, gridy) {
        this.gridX = gridx
        this.gridY = gridy
    }

    getGrid() {
        let grid = []
        grid.push(createVector(this.gridX, this.gridY))
        return grid
    }


    setSnap(boolenaSnap) {
        this.isSnap = boolenaSnap
    }

    snapTo() {
        let ip;   // integer part
        let fp;   // "fraction" part
        let x = this.dx;
        let y = this.dy;
        let snap = []

        fp = x / this.gridX;
        ip = parseInt(fp);
        fp = fp - ip;
        if (fp > 0.5)
            x = (ip + 1.0) * this.gridX;
        else if (fp < -0.5)
            x = (ip - 1.0) * this.gridX;
        else
            x = ip * this.gridX;

        fp = y / this.gridY;
        ip = parseInt(fp);
        fp = fp - ip;
        if (fp > 0.5)
            y = (ip + 1.0) * this.gridY;
        else if (fp < -0.5)
            y = (ip - 1.0) * this.gridY;
        else
            y = ip * this.gridY;

        snap.push(createVector(x, y))

        return snap
    }


    //methods to create curves
    createCurvesToDraw() {
        switch (this.curveType) {
            case 'LINE':
                _model.numberOfcurvers++
                _model.m_curves.push(new _line(_model.numberOfcurvers))
                _model.m_curves[_model.m_curves.length - 1].currentCurve = true
                noFill()
                break;
            case 'POLYLINE':
                _model.numberOfcurvers++
                _model.m_curves.push(new _polyline(_model.numberOfcurvers))
                _model.numberOfcurvers++
                _model.m_curves[_model.m_curves.length - 1].currentCurve = true
                noFill()
                break;
            case 'POINT':
                _model.numberOfcurvers++
                _model.m_curves.push(new _point(_model.numberOfcurvers))
                _model.m_curves[_model.m_curves.length - 1].currentCurve = true
                noFill()
                break;
            default:
                console.log(`Anyone curve was selected`);
        }
    }

    typeCurvesToDraw() {
        if (_model.m_curves.length < 1) {
            return
        }

        switch (this.curveType) {
            case 'LINE':
                if (this.statusLineButton) {
                    if (!_model.m_curves[_model.m_curves.length - 1].isPossible()) {
                        var temp = _model.m_curves[_model.m_curves.length - 1].getPointsToDraw(this.dx, this.dy)
                        _model.m_curves[_model.m_curves.length - 1].setPoints(temp[0].x, temp[0].y, temp[1].x, temp[1].y)
                        redraw()
                    }
                } else {
                    _model.m_curves[_model.m_curves.length - 1].currentCurve = false
                    this.curveType = ''
                    this.statusLineButton = false
                    this.typeClickLine = ''
                    redraw()
                }
                break;
            case 'POLYLINE':
                if (this.statusLineButton) {
                    if (!_model.m_curves[_model.m_curves.length - 1].isPossible()) {
                        _model.m_curves[_model.m_curves.length - 1].getPointsToDraw(this.dx, this.dy)
                        redraw()
                    }
                } else {
                    _model.m_curves[_model.m_curves.length - 1].currentCurve = false
                    this.statusLineButton = false
                    this.curveType = ''
                    this.typeClickLine = ''
                    redraw()
                }
                break;
            case 'POINT':
                if (this.statusPointButton) {
                    if (!_model.m_curves[_model.m_curves.length - 1].isPossible()) {
                        var temp = _model.m_curves[_model.m_curves.length - 1].getPointsToDraw(this.dx, this.dy)
                        _model.m_curves[_model.m_curves.length - 1].setPoints(temp[0].x, temp[0].y)
                        _m
                        redraw()
                    } else {
                        _model.m_curves[_model.m_curves.length - 1].currentCurve = false
                        this.curveType = ''
                        this.statusPointButton = false
                        redraw()
                    }

                }
                break;
            default:
        }
    }

    //cria pontos e objetos de pontos para ser possível selecionar nós
    createPoints() {
        _model.m_verts = []
        _model.m_points = []
        _model.numberOfcurvers = 0

        if (_model.m_curves.length >= 1) {
            for (var i = 0; i < _model.m_curves.length; i++) {

                let pts = []
                pts = _model.m_curves[i].getPoints()

                for (var j = 0; j < pts.length; j++) {
                    _model.m_verts.push(createVector(pts[j].x, -pts[j].y))
                    this.createVectorOfobjectPoints(j, pts)
                }
            }
        }

    }

    //cria objetos de pontos
    createVectorOfobjectPoints(j, pts) {

        _model.numberOfcurvers++
        _model.m_points.push(new _point(_model.numberOfcurvers))
        _model.m_points[j].m_x1 = pts[j].x
        _model.m_points[j].m_y1 = pts[j].y
    }

    //verifica se no vetor de pontos m_verts possui pontos iguais. se houver elimina o igual.
    verifyIfPointIsEqual() {
        //vetor auxiliar
        var aux = []
        //verifica se algum ponto é igual ao outro.
        if (_model.m_curves.length >= 1) {
            for (var i = 0; i < _model.m_verts.length; i++) {
                var isEqual = false
                if (i < _model.m_verts.length - 1) {
                    for (var j = i + 1; j < _model.m_verts.length; j++) {
                        if (i != j) {
                            if (_model.m_verts[i].x == _model.m_verts[j].x &&
                                _model.m_verts[i].y == _model.m_verts[j].y) {
                                isEqual = true
                                break
                            }
                        }
                    }
                }

                //se o ponto for diferente dos anteriores então o ponto é excluido do vetor auxiliar
                if (isEqual == false) {
                    aux.push(createVector(_model.m_verts[i].x, _model.m_verts[i].y))
                }
            }

            //se o vetor auxiliar tiver tamanho diferente dos vetor verts então algum ponto foi excluído. Neste sentido o vetor m_verts é criado novamente sem o ponto que era igual. 
            if (aux.length != _model.m_verts.length) {
                _model.m_verts = []
                _model.m_points = []
                _model.numberOfcurvers = 0
                var pts = []

                for (var j = 0; j < aux.length; j++) {
                    _model.m_verts.push(createVector(aux[j].x, aux[j].y))

                    pts.push(createVector(aux[j].x, -aux[j].y))
                    this.createVectorOfobjectPoints(j, pts)
                }
            }
        }

    }

    addTipeOfElement() {
        return 'TP2'
    }

    createMaterial(MaterialType) {
        var outro = document.querySelector("#outrosButton");
        var valor = outro.value;
        console.log(valor);
        switch (MaterialType) {
            case 'CONCRETO':
                this.struct.createMaterial(this.struct.type)
                this.struct.matrixOfMat[this.struct.nmats - 1].materialTruss(this.struct, this.struct.nmats - 1, 23000, 0.00010)
                break;
            case 'AÇO':
                this.struct.createMaterial(this.struct.type)
                this.struct.matrixOfMat[this.struct.nmats - 1].materialTruss(this.struct, this.struct.nmats - 1, 200000, 0.000011)
                break;
            case 'ALUMÍNIO':
                this.struct.createMaterial(this.struct.type)
                this.struct.matrixOfMat[this.struct.nmats - 1].materialTruss(this.struct, this.struct.nmats - 1, 60000, 0.000022)
                break;
            case 'OUTROS':
                this.struct.createMaterial(this.struct.type)
                //##complete aqui

                //##complete aqui
                this.struct.matrixOfMat[this.struct.nmats - 1].materialTruss(this.struct, this.struct.nmats - 1, valor, 0.000022)
                break;
            default:
                console.log(`Material inexistente`);
        }
        this.struct.matrixOfMat[this.struct.nmats - 1].name = MaterialType
        console.log('Material adicionado')

    }

    //configurar o material em um elemento
    setMaterial(material) {
        if (this.statusMaterialButton) {
            for (var j = 0; j < _model.m_curves.length; j++) {
                if (_model.m_curves[j].selected) {
                    _model.m_curves[j].material = material
                }
            }
        }

    }

    secaoTransversal() {
        this.struct.createCrossSection(this.struct.type)
        this.struct.matrixOfcrossSec[this.struct.nsecs - 1].crossSectionTruss(this.struct, 100)
        console.log('Seção transversal adicionada')
    }

    //configura o material na curva da geometria
    setCrossSection(crossSection) {
        if (this.statusSectionButton) {
            for (var j = 0; j < _model.m_curves.length; j++) {
                if (_model.m_curves[j].selected) {
                    _model.m_curves[j].crossSection = crossSection
                }
            }
        }
    }

    CreateSupport() {
        //criando flag para desenho do suportes
        for (var j = 0; j < _model.m_points.length; j++) {
            if (_model.m_points[j].selected) {
                _model.m_points[j].drawSupport = true
                _model.m_points[j].typeSuportToDraw = _objectOfDrawing.supportType //mudificado 1
                console.log('Suporte adicionado')
                _model.m_points[j].selected = false
                _model.m_points[j].suportType = _objectOfDrawing.supportType
            }
        }

        redraw()
    }

    //sconfigura o suporte no ponto da geometria
    setSupport(crossSection) {
        if (this.statusSupportButton) {
            for (var j = 0; j < _model.m_points.length; j++) {
                if (_model.m_points[j].selected) {
                    _model.m_points[j].suport = crossSection
                }
            }
        }
    }

    createForce() {
        //criar o método de força


        //criando flag para desenho do suportes
        for (var j = 0; j < _model.m_points.length; j++) {
            if (_model.m_points[j].selected) {
                _model.m_points[j].drawForce = true
                console.log('força adicionada')
                _model.m_points[j].selected = false
            }

        }

        redraw()
    }

    //sconfigura o suporte no ponto da geometria
    setForce(force) {
        if (this.statusForceButton) {
            for (var j = 0; j < _model.m_points.length; j++) {
                if (_model.m_points[j].selected) {
                    _model.m_points[j].force = force
                }
            }
        }
    }

    createMesh() {


        if (this.struct.nsecs < 1) {
            window.alert('Necessário criar ao menos uma seção transversal')
            return
        }

        if (this.struct.nmats < 1) {
            window.alert('Necessário criar ao menos um material')
            return
        }

        if (_model.m_curves.length < 1) {
            window.alert('Necessário ao menos a criação de uma geometria')
            return
        }

        if (_model.geometry) {

            _model.geometry = false
            _model.mesh = true

            //creating nodes (########CORRIGIR UNIDADES DOS NÓS //VEJA O MULTIPLICADO POR 1000 QUE É PRA PASSAR AS COORDENADAS PARA mm #######)
            for (var j = 0; j < _model.m_verts.length; j++) {
                this.struct.createNode(_model.m_verts[j].x * 1000, -_model.m_verts[j].y * 1000)
            }

            for (var i = 0; i < _model.m_curves.length; i++) {
                this.struct.createElements(this.struct.type)
                var no1
                var no2

                //flag para verificar se os nós da curva batem com os nós do vertex, e assim definir os nós do elemento "i"
                var flag1 = false
                var flag2 = false

                //creating elements
                for (var j = 0; j < _model.m_verts.length; j++) {

                    if (this.struct.type == 'TP2') {
                        //nó 1 de cada elemento
                        if (_model.m_curves[i].m_x1 == _model.m_verts[j].x &&
                            _model.m_curves[i].m_y1 == -_model.m_verts[j].y) {
                            no1 = this.struct.matrixOfNodes[j].number
                            flag1 = true
                        }

                        //nó 2 de cade elemento
                        if (_model.m_curves[i].m_x2 == _model.m_verts[j].x &&
                            _model.m_curves[i].m_y2 == -_model.m_verts[j].y) {
                            no2 = this.struct.matrixOfNodes[j].number
                            flag2 = true
                        }

                        //Verifica se os dois nós do elemento "i" foram encontrados.
                        if (flag1) {
                            if (flag2) {
                                break
                            }
                        }

                        //material do elemento atual

                    }

                }

                //cria o elemento
                this.struct.matrixOfelems[i].elementTruss(this.struct, i, no1, no2, this.struct.matrixOfMat[0].number, this.struct.matrixOfcrossSec[0].number)

            }

            //este laço varre os elementos para criar suportes, 
            for (var i = 0; i < _model.m_points.length; i++) {

                if (_model.mesh) {
                    //cria o support do elemento
                    //criando supportes da malha
                    //cria o support no processador para criação da estrutura
                    if (_model.m_points[i].drawSupport) {
                        let rtx
                        let rty
                        let rmz
                        switch (_model.m_points[i].suportType) {
                            case 'PRIMEIROGENERO':
                                rtx = 1
                                rty = 0
                                rmz = 0
                                break
                            case 'SEGUNDOGENERO':
                                rtx = 1
                                rty = 1
                                rmz = 0
                                break
                            case 'TERCEIROGENERO':
                                rtx = 1
                                rty = 1
                                rmz = 1
                                break
                            default:
                                window.alert(`SUPORT INEXISTENTE`);
                        }

                        this.struct.createSupport(this.struct.type)
                        this.struct.matrixOfsup[this.struct.naps - 1].setSupportNode(this.struct, this.struct.naps - 1, this.struct.matrixOfNodes[i], rtx, rty)

                    }


                    //cria a força no processador para criação da estrutura
                    if (_model.m_points[i].drawForce) {
                        this.struct.createLoads('nodal')
                        this.struct.matrixOfNosCar[this.struct.nnoscar - 1].nodalLoad(this.struct, this.struct.matrixOfNodes[i], this.struct.nnoscar - 1, 0, -100000)
                    }
                }
            }

        } else {
            _model.geometry = true
            _model.mesh = false

            this.struct
            this.struct.resetMest()
        }

        redraw()
    }


    runMesh() {
        //CONFERÊNCIA DE ERROS

        if (this.struct.nnos < 2) {
            window.alert('Necessário ao menos dois nós')
            return
        }

        if (_model.m_curves.length < 1) {
            window.alert('Necessário ao menos a criação de uma geometria')
            return
        }

        if (this.struct.nsecs < 1) {
            window.alert('Necessário criar ao menos uma seção transversal')
            return
        }

        if (this.struct.nmats < 1) {
            window.alert('Necessário criar ao menos um material')
            return
        }

        if (this.struct.nelems < 1) {
            window.alert('nenhum elemento foi criado')
            return
        }

        if (this.struct.naps < 1) {
            window.alert('Necessário ao menos 1 apoio')
            return
        }

        if (this.struct.nnoscar < 1) {
            window.alert('Necessário ao menos 1 nó carregado')
            return
        }

        //################## 2 - CRIAÇÃO DA MATRIZ DE GRAUS DE LIBERDADE DA ESTRUTURA############################
        //evaluating the number of degree of freedoms and creating the matrix of dof
        this.struct.Grau_de_liberdade()
        //################## 2 - CRIAÇÃO DA MATRIZ DE GRAUS DE LIBERDADE DA ESTRUTURA############################

        //################### 3 - CRIAÇÃO DA MATRIZ DE RIGIDEZ DA ESTRUTURA############################
        this.struct.stiffnessMatrixOfStruct()
        //################### 3 - CRIAÇÃO DA MATRIZ DE RIGIDEZ DA ESTRUTURA############################

        //################### 4 - FORÇAS EXTERNAS DA ESTRUTURA###########################
        this.struct.externalLoads()
        //################### 4 - FORÇAS EXTERNAS DA ESTRUTURA############################

        //################### 5 - DESLOCAMENTO NODAL DA ESTRUTURA############################
        this.struct.nodalDisplacement()
        //################### 5 - DESLOCAMENTO NODAL DA ESTRUTURA############################

        //################### 5 - DESLOCAMENTO NODAL DA ESTRUTURA############################
        this.struct.nodalDisplacement()
        //################### 5 - DESLOCAMENTO NODAL DA ESTRUTURA############################

        //################### 6 - PRINTA OS RESULTADOS NO CONSOLE############################
        this.struct.printResultOnConsole()
        //################### 6 - PRINTA OS RESULTADOS NO CONSOLE############################

        //################### 7 - LIBERA PARA O DESENHO NA TELA############################
        if (this.drawDisplacementResult) {
            this.drawDisplacementResult = false
        } else {
            this.drawDisplacementResult = true
            this.storedResults()
        }
          
        //################### 7 - LIBERA PARA O DESENHO NA TELA############################       
       
    }

    storedResults(){
         
        for (var i = 0; i < control.struct.Uestr._data.length ; i++) {
            var dx = control.struct.Uestr.get([i, 0])
            i++
            var dy = control.struct.Uestr.get([i, 0])           

            this.displacementVectorControl.push(createVector(dx, dy))
        } 
    }



}