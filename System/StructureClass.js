//--------Verson 1.0 - 18/12/2021
//-----------Documentation
//this class was created to generate a strcuture object, that will solve the MEF problem
//All the atributes are defined in the constructor
//it does not have units in this class

//-----------Use way
//Instatiate this way: node1 = new structure()
//

//--------Created by
//Professor Marcel Willian Reis Sales
//for reference use Sales, M., W., R.


class structure {
    constructor() {
        this.type = 'TP2'
        this.nnos = 0  //nodes number of the strucutre
        this.nmats = 0 //materials number of the strucutre
        this.nsecs = 0 //cross sections number of the strucutre
        this.nelems = 0 //elements number of the strucutre
        this.naps = 0 //support number of the strucutre
        this.nnoscar = 0 //nodes loaded number of the strucutre
        this.nelemscar = 0 //elements number of the strucutre
        this.neq = 0 //number of equations to solve problem

        //cordinates of each node to compose strucutre
        //the quantity of line of this matrix have to be the same number of the nnos
        this.matrixOfNodes = math.matrix() //store nodes objects
        this.coordnos = math.matrix()

        //matrix of the material properties that compose the strucutre
        //the quantity of line of this matrix have to be the same number of the nmats
        this.matrixOfMat = math.matrix() //store material objects
        this.propmats = math.matrix()

        //matrix of the cross section of each element that compose the strucutre
        //the quantity of line of this matrix have to be the same number of the nsecs
        this.matrixOfcrossSec = math.matrix() //store cross section objects
        this.propgeo = math.matrix()

        //matrix that defines what nodes compose one element
        //define the what the line of propmats and propgeo is the material and cross section of that element
        //the quantity of line of this matrix have to be the same number of the nelems
        this.matrixOfelems = math.matrix() //store elements objects
        this.propelems = math.matrix()

        //this matrix defines the suports that compose the structure
        //the quantity of line of this matrix have to be the same number of the naps
        this.matrixOfsup = math.matrix() //store supports objects
        this.restrsap = math.matrix()

        //this matrix defines the distributed load of each element
        //the quantity of line of this matrix have to be the same number of the nnoscar 
        this.matrixOfNosCar = math.matrix() //store nodes loaded objects
        this.cargasnos = math.matrix()

        //this matrix defines what node  of each element have a pontual load
        //the quantity of line of this matrix have to be the same number of the nelemscar
        this.cargaselems = math.matrix()

        //degree of freedom matrix of the node
        this.glno = []

        //Global stiffness matrix of the structure
        this.Kestr = math.matrix()

        //External loads of the structure
        this.Festr = math.matrix()

        //Nodal displacement
        this.Uestr = math.matrix()


    }

    //################## 1- LEITURA DE DADOS############################

    //Creating a new node and adding in the matrix of coordinates to compose structure
    createNode(posX, posY) {

        //creating a new line to set the new node position of the structure
        this.coordnos = math.subset(this.coordnos, math.index(this.nnos, [0, 1]), [posX, posY])

        //add number of nodes
        this.nnos++

        //create a new node object and adding in the matrix of nodes
        this.matrixOfNodes[this.nnos - 1] = new node(posX, posY, this.nnos)
    }

    //Creating a new material and adding in the matrix of materials to compose structure
    createMaterial(type) {

        //add number of material
        this.nmats++

        //create a new material object
        this.matrixOfMat[this.nmats - 1] = new material(this.nmats)

        switch (type) {
            case 'TP2':
                //creating a new line to set the new material position of the structure
                this.propmats = math.subset(this.propmats, math.index(this.nmats - 1, [0, 1]), [0, 0])
                break;

            default:
                break;
        }
    }

    //This method is used to create new cross section
    //and set in the aproprieted matrix
    createCrossSection(type) {

        //add number of cross Section
        this.nsecs++

        //create a new cross Section object and it is stored in a matrix
        this.matrixOfcrossSec[this.nsecs - 1] = new crossSection(type, this.nsecs)

        switch (type) {
            case 'TP2':
                //creating a new line to set the new cross Section of the structure       
                this.propgeo = math.subset(this.propgeo, math.index(this.nsecs - 1, [0]), 0)

                break;

            default:
                break;
        }
    }

    //This method is used to create new elements
    //and set in the aproprieted matrix
    createElements(type) {

        //add number of element
        this.nelems++

        //create a new element object and it is stored in a matrix
        this.matrixOfelems[this.nelems - 1] = new element(type, this.nelems)

        switch (type) {
            case 'TP2':
                //creating a new line to set the new cross elements of the structure
                //%___no1__no2_material_seção
                this.propelems = math.subset(this.propelems, math.index(this.nelems - 1, [0, 1, 2, 3]), [0, 0, 0, 0])
                break;

            default:
                break;
        }
    }

    //This method is used to create new supports
    //and set in the aproprieted matrix
    createSupport(type) {

        //add number of Support
        this.naps++

        //create a new Support object and it is stored in a matrix
        this.matrixOfsup[this.naps - 1] = new support(type, this.naps)

        switch (type) {
            case 'TP2':
                //creating a new line to set the new Support of the structure
                //Apoios_(r=1_impedido_r=0_livre)
                //__no__rtx_rty
                this.restrsap = math.subset(this.restrsap, math.index(this.naps - 1, [0, 1, 2]), [0, 0, 0])
                break;

            default:
                break;
        }
    }

    //This method is used to create new nodal loads
    //and set in the aproprieted matrix
    createLoads(type_load) {

        //add number of Support
        this.nnoscar++

        //create a new nodal load object and it is stored in a matrix
        this.matrixOfNosCar[this.nnoscar - 1] = new load(type_load, this.nnoscar)

        switch (type_load) {
            case 'nodal':
                //creating a new line to set the new nodal load of the structure
                //%Nos_carregados
                //%__no____fx_____fy
                this.cargasnos = math.subset(this.cargasnos, math.index(this.nnoscar - 1, [0, 1, 2]), [0, 0, 0])
                break;

            default:
                break;
        }
    }
    //################## 1- LEITURA DE DADOS############################

    //################## 2 - CRIAÇÃO DA MATRIZ DE GRAUS DE LIBERDADE DA ESTRUTURA############################
    //methodo to create a degree of freedom for the structure    
    Grau_de_liberdade() {
        //for this version all the elements must be the same
        //number o degree of freedom "nglno" is the same for all elements

        /* 
        #neste primeiro laço é encontrado a matriz de graus de liberdade
        #basicamente, o que é feito aqui é pegar da matriz de restrições do apoio do nó restringido
        #depois esse nó será a linha da matriz glno onde serão adicionados os graus de liberdade da matriz de restrição
        #"lembre-se", a matriz de restrições restrap tem 3 colunas, onde se define para cada nó sua restrição, ou seja, 0 ou 1
        #então, a primeira coluna de restrasp não entra na matriz glno, porque é a coluna dos nós.
        */
        var nglno = this.matrixOfelems[0].nglno
        this.glno = math.zeros(this.nnos, nglno)

        for (var i = 0; i < this.naps; i++) {
            var no = this.restrsap.subset(math.index(i, 0))
            for (var j = 1; j <= this.naps; j++) {
                var a = this.restrsap.subset(math.index(i, j))
                this.glno.subset(math.index(no - 1, j - 1), a)
            }
        }

        for (var k = 0; k < this.nnos; k++) {
            for (var p = 0; p < nglno; p++) {
                var b = this.glno.subset(math.index(k, p))
                if (b == 1) {
                    this.glno.subset(math.index(k, p), 0)
                } else {
                    this.neq++
                    this.glno.subset(math.index(k, p), this.neq)
                }
            }
        }
    }
    //################## 2 - CRIAÇÃO DA MATRIZ DE GRAUS DE LIBERDADE DA ESTRUTURA############################

    //################### 3 - CRIAÇÃO DA MATRIZ DE RIGIDEZ DA ESTRUTURA############################
    stiffnessMatrixOfStruct() {
        //cria o tamanho do vetor de graus de liberdade do elemento, por exemplo, se nglno = 2 (graus de liberdade do elemento)
        //e nnoselem = 2 (número de nós por elemento), então o número de graus de liberdade por elemento será 4.
        var glno = this.glno
        var nglno = this.matrixOfelems[0].nglno
        var nnoselem = this.matrixOfelems[0].nnoselem
        var nglel = nglno * nnoselem

        var npropmat = this.matrixOfelems[0].npropmat
        var npropgeo = this.matrixOfelems[0].npropgeo
        var type = this.matrixOfelems[0].type

        //Assim, este vetor irá guardar, para o exemplo anterior, 4 graus de liberdade, sendo 2 graus por nó.
        //Portanto, o vetor gle = (gdl x do nó 1, gdl y do nó 1, gdl x do nó 2, gdl y do nó 2) totalizando 4 posições para o exemplo anterior
        var gle = math.zeros(1, nglel)

        //Aqui é criada a matriz de rigidez global neq por neq, ou seja, nesta matriz já foram retiradas as linhas e colunas dos apoios, quando for encontrar os deslocamentos
        var neq = this.neq
        this.Kestr = math.zeros(neq, neq)

        //este laço irá criar a matriz de rigidez global  
        for (var el = 0; el < this.nelems; el++) {

            //aqui se identifica o material do elemento 
            var idmat = this.propelems.subset(math.index(el, nnoselem))

            //aqui se identifica a seção do elemento
            var idsec = this.propelems.subset(math.index(el, nnoselem + 1))

            //aqui pega toda a linha do material daquele elemento
            var pmat = math.zeros(1, npropmat)
            pmat = this.propmats.subset(math.index(idmat - 1, math.range(0, npropmat + 1)))

            //aqui pega toda a linha da propriedade da seção transversal do elemeno
            var psec = math.zeros(1, npropgeo)
            psec = this.propgeo.subset(math.index(idsec - 1, math.range(0, npropgeo + 1)))

            //Aqui está chamado de "no", mas na verdade é a barra que vai do nó da posição 1 até a posição 4 do vetor "no"
            var no = this.propelems.subset(math.index(el, math.range(0, nnoselem)))



            if (type == 'TP2' || type == 'PP2' || type == 'GP2') {
                //Cálculo de L, cs e sn
                //variáveis para calcular a distância entre nós
                var no1 = no.subset(math.index(0, 0))
                var no2 = no.subset(math.index(0, 1))

                //coletando os valores das coordenadas x e y de cada nó                   
                var x1 = this.coordnos.subset(math.index(no1 - 1, 0))
                var x2 = this.coordnos.subset(math.index(no2 - 1, 0))

                var y1 = this.coordnos.subset(math.index(no1 - 1, 1))
                var y2 = this.coordnos.subset(math.index(no2 - 1, 1))

                //calculando as componentes x e y da distância entre os nós  
                var dx = x2 - x1
                var dy = y2 - y1

                //calculando a distância por pitágoras
                var L = math.sqrt(dx * dx + dy * dy)

                //calculando o cosseno e seno da estrutura
                var cs = dx / L
                var sn = dy / L

                if (L <= 0.00000001) {
                    alert(`Error when trying to evalute the distance of element ${el + 1}, value near to zero`)
                    break
                }
            } else {
                alert("This element type is not implemented, for this is impossible to create matrix of the strucutre, erro in the rigidMatrixOfStrucutre()")
                break;
            }


            //Creating the local stiffness and rotational matrix
            if (type == 'TP2') {
                //setting material and cross section of the element "el" to create the stiffness matrix
                var mat = pmat.subset(math.index(0, 0))
                var sec = psec.subset(math.index(0, 1))
                this.matrixOfelems[el].E = mat
                this.matrixOfelems[el].A = sec
                this.matrixOfelems[el].L = L

                //Creating the local stiffness matrix 
                this.matrixOfelems[el].stiffnessMatrix()
                var Kel = math.subset(this.matrixOfelems[el].Kel, math.index(math.range(0, nglel), math.range(0, nglel)))

                //Creating the rotational matrix
                this.matrixOfelems[el].cs = cs
                this.matrixOfelems[el].sn = sn
                this.matrixOfelems[el].rotationalMatrix()
                var Rel = math.subset(this.matrixOfelems[el].Rel, math.index(math.range(0, nglel), math.range(0, nglel)))

                // .subset(math.index(math.range(0, nglel), math.range(0, nglel)))               

            } else {
                alert(`Matrix of this element was not implemented, please verify the element ${el + 1}`)
                break
            }

            //transfering from local sistem to the lobal sistem   
            if (type != 'ISO') {
                Kel = math.multiply(math.multiply(math.transpose(Rel), Kel), Rel)
            }

            //Degree of freedom (DOF) for compose element in the global stiffness matrix
            gle = this.matrixOfelems[el].DOFelement(glno, no, nglno)


            //setting matrix element in the global stiffness matrix for compose structure            
            var p
            var k
            var Kini
            var ke
            for (var i = 0; i < nglel; i++) {
                if (gle[0][i] > 0) {
                    for (var j = 0; j < nglel; j++) {
                        if (gle[0][j] > 0) {
                            p = gle[0][i] - 1
                            k = gle[0][j] - 1
                            Kini = this.Kestr.subset(math.index(p, k))
                            ke = Kel.subset(math.index(i, j))
                            this.Kestr = math.subset(this.Kestr, math.index(p, k), Kini + ke)
                        }
                    }
                }
            }


        }
    }
    //################### 3 - CRIAÇÃO DA MATRIZ DE RIGIDEZ DA ESTRUTURA############################

    //################### 4 - FORÇAS EXTERNAS DA ESTRUTURA############################
    externalLoads() {
        var nglno = this.matrixOfelems[0].nglno
        this.Festr = math.zeros(this.neq, 1)



        //Extenal forces in the nodes
        var node
        var gl
        var Fini
        var F
        for (var i = 0; i < this.nnoscar; i++) {

            node = this.cargasnos.subset(math.index(i, 0))

            for (var j = 0; j < nglno; j++) {

                gl = this.glno.subset(math.index(node - 1, j))


                if (gl > 0) {

                    Fini = this.Festr.subset(math.index(gl - 1, 0))
                    F = this.cargasnos.subset(math.index(i, j + 1))
                    this.Festr = math.subset(this.Festr, math.index(gl - 1, 0), Fini + F)

                }
            }
        }

        //Loaded elements
        //MUST BE IMPLEMENTED
    }
    //################### 4 - FORÇAS EXTERNAS DA ESTRUTURA############################



    //################### 5 - DESLOCAMENTO NODAL DA ESTRUTURA############################
    nodalDisplacement() {
        var nglno = this.matrixOfelems[0].nglno
        this.Uestr = math.zeros(nglno * this.nnos, 1)

        //evalute of the freedom displacement nodal
        var U = math.multiply(math.inv(this.Kestr), this.Festr)

        var gl
        var u
        for (var i = 0; i < this.nnos; i++) {
            for (var j = 0; j < nglno; j++) {
                gl = this.glno.subset(math.index(i, j))
                if (gl != 0) {
                    u = U.subset(math.index(gl - 1, 0))
                    this.Uestr = math.subset(this.Uestr, math.index(j + nglno * i, 0), u)
                }
            }
        }
    }
    //################### 5 - DESLOCAMENTO NODAL DA ESTRUTURA############################

    //################### 6 - PRINTA OS REUSLTADOS NO CONSOLE############################
    printResultOnConsole() {
        //################## PRINTA LEITURA DE DADOS############################
        console.log('Tipo de elemento')
        console.log(this.type)
        console.log('Número de nós')
        console.log(this.nnos)
        console.log('Número de materiais')
        console.log(this.nmats)
        console.log('Número de seções transversais')
        console.log(this.nsecs)
        console.log('Numero_de_elementos')
        console.log(this.nelems)
        console.log('Numero_de_apoios')
        console.log(this.naps)
        console.log('Numero_de_nos_carregados')
        console.log(this.nnoscar)
        console.log('Coordenadas dos nós')
        console.log('%____X_____Y')
        console.log(this.coordnos)
        console.log('Propriedades dos materiais')
        console.log('%_______E________ALPHA')
        console.log(this.propmats)
        console.log('Propriedades_das_seções_transversais')
        console.log('%___Area')
        console.log(this.propgeo)
        console.log('Propriedades_dos_elementos')
        console.log('___no1__no2_material_seção')
        console.log(this.propelems)
        console.log('Apoios_(r=1_impedido_r=0_livre)')
        console.log('__no__rtx_rty')
        console.log(this.restrsap)
        console.log('Nos_carregados')
        console.log('__no____fx_____fy')
        console.log(this.cargasnos)
        //################## PRINTA LEITURA DE DADOS############################

        //################ PRINTA CRIAÇÃO DA MATRIZ DE GRAUS DE LIBERDADE DA ESTRUTURA#######################
        console.log('Número de graus de liberdade do nó')
        console.log(this.matrixOfelems[0].nglno)
        console.log('Matrix de graus de liberdade do nó')
        console.log(this.glno)
        console.log('Número de equações')
        console.log(this.neq)
        //################## PRINTA CRIAÇÃO DA MATRIZ DE GRAUS DE LIBERDADE DA ESTRUTURA####################

        //################### PRINTA CRIAÇÃO DA MATRIZ DE RIGIDEZ DA ESTRUTURA############################
        console.log('Matriz de Rigidez da estrutura')
        console.log(this.Kestr)
        //################### PRINTA CRIAÇÃO DA MATRIZ DE RIGIDEZ DA ESTRUTURA############################


        //################### PRINTA FORÇAS EXTERNAS DA ESTRUTURA############################
        console.log('Forças externas')
        console.log(this.Festr)
        //################### PRINTA FORÇAS EXTERNAS DA ESTRUTURA############################

        //################### PRINTA DESLOCAMENTO NODAL DA ESTRUTURA############################
        console.log('Deslocamento nodal da estrutura')
        console.log(this.Uestr)
        //################### PRINTA DESLOCAMENTO NODAL DA ESTRUTURA############################
    }
    //################### 6 - PRINTA OS REUSLTADOS NO CONSOLE############################

    //################### 7 - OUTROS COMANDOS - COMO RESET MESH############################
    resetMest() {
        this.nnos = 0  //nodes number of the strucutre
        this.nmats = 0 //materials number of the strucutre
        this.nsecs = 0 //cross sections number of the strucutre
        this.nelems = 0 //elements number of the strucutre
        this.naps = 0 //support number of the strucutre
        this.nnoscar = 0 //nodes loaded number of the strucutre
        this.nelemscar = 0 //elements number of the strucutre
        this.neq = 0 //number of equations to solve problem

        //cordinates of each node to compose strucutre
        //the quantity of line of this matrix have to be the same number of the nnos
        this.matrixOfNodes = math.matrix() //store nodes objects
        this.coordnos = math.matrix()

        //matrix of the material properties that compose the strucutre
        //the quantity of line of this matrix have to be the same number of the nmats
        this.matrixOfMat = math.matrix() //store material objects
        this.propmats = math.matrix()

        //matrix of the cross section of each element that compose the strucutre
        //the quantity of line of this matrix have to be the same number of the nsecs
        this.matrixOfcrossSec = math.matrix() //store cross section objects
        this.propgeo = math.matrix()

        //matrix that defines what nodes compose one element
        //define the what the line of propmats and propgeo is the material and cross section of that element
        //the quantity of line of this matrix have to be the same number of the nelems
        this.matrixOfelems = math.matrix() //store elements objects
        this.propelems = math.matrix()

        //this matrix defines the suports that compose the structure
        //the quantity of line of this matrix have to be the same number of the naps
        this.matrixOfsup = math.matrix() //store supports objects
        this.restrsap = math.matrix()

        //this matrix defines the distributed load of each element
        //the quantity of line of this matrix have to be the same number of the nnoscar 
        this.matrixOfNosCar = math.matrix() //store nodes loaded objects
        this.cargasnos = math.matrix()

        //this matrix defines what node  of each element have a pontual load
        //the quantity of line of this matrix have to be the same number of the nelemscar
        this.cargaselems = math.matrix()
    }
    //################### 7 - OUTROS COMANDOS - COMO RESET MESH############################


}

