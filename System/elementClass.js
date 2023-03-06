//--------Verson 1.0 - 18/12/2021
//-----------Documentation
//This class was created to generate objects type of finit elements
//This class needs type of the element to create correct elements
//This class have a method to create the rigid matrix of the element

//it does not have units in this class

//-----------Use way
//Instatiate this way: el = new element(type, n)
//The type is a string variable to set type of the element, for exemple: type = 'TP2' or 'PP2'
//Number is an atribute 
//The object generated will have some atributes like: 
//  *type of element, nodes number, cordanates matrix of the nodes, and material matrix, rigid matrix and elasticity modulos
//  *element of truss has area as atribute
//  *element frame (pórtico) has area, and inertia as atributes
//new elements can be create by the new 'cases' in the switch


//--------Created by
//Professor Marcel Willian Reis Sales
//for reference use Sales, M., W., R.

class element {
    constructor(type, n) {
        //Elasticity modulus
        this.E
        this.number = n
        this.cs
        this.sn

        //atributes of each elements
        switch (type) {
            case 'TP2':
                this.type = 'TP2'
                this.nnos = 2
                this.nnoselem = 2
                this.ncarelem = 0
                this.nglno = 2
                this.ncoord = 2
                this.npropmat = 1
                this.npropgeo = 1
                this.A
                this.L
                this.coordElement = []
                this.matElement = []
                this.Kel = []
                this.Rel = []
                break;
            case 'PP2':
                this.type = 'PP2'
                this.nnos = 2
                this.nnoselem = 2
                this.ncarelem = 2
                this.nglno = 3
                this.ncoord = 2
                this.npropmat = 1
                this.npropgeo = 3
                this.A
                this.I
                this.L
                this.coordElement = []
                this.matElement = []
                this.Rel = []
                break;
            default:
                console.log('Verifique o elemento colocado')
                break;
        }
    }

    //PUBLIC METHODS

    //storing the nodes, material and cross section in the elements matrix in the structure
    elementTruss(struct, NumberOfelem, node1, node2, mat, cross) {
        //%___no1__no2_material_seção
        struct.propelems = math.subset(struct.propelems, math.index(NumberOfelem, 0), node1)
        struct.propelems = math.subset(struct.propelems, math.index(NumberOfelem, 1), node2)
        struct.propelems = math.subset(struct.propelems, math.index(NumberOfelem, 2), mat)
        struct.propelems = math.subset(struct.propelems, math.index(NumberOfelem, 3), cross)

    }

    //Method to create a stiffness matrix of the element
    stiffnessMatrix(){
        var nglel = this.nnoselem*this.nglno
        this.Kel = math.zeros(nglel,nglel)
        switch (this.type) {
            case 'TP2':
                var A = this.A
                var E = this.E
                var L = this.L

                //creating the local stiffness matrix
                var k = E*A/L
                this.Kel = math.subset(this.Kel, math.index(0, 0), k)
                this.Kel = math.subset(this.Kel, math.index(0, 2), -k)

                this.Kel = math.subset(this.Kel, math.index(2, 0), -k)
                this.Kel = math.subset(this.Kel, math.index(2, 2), k)
                break;
            case 'PP2':
                var A = this.A
                var E = this.E
                var L = this.L
                var L = this.I
                //create this stiffness matrix of frame after
                break;
            default:
                console.log('Verifique o elemento colocado')
                break;
        }
    }

    //Local rotational matrix
    rotationalMatrix() {
        var nglel = this.nnoselem*this.nglno 
        this.Rel = math.zeros(nglel,nglel)
        
        switch (this.type) {
            case 'TP2':
                var cs = this.cs
                var sn = this.sn               
                
                //creating the rotational matrix
                this.Rel = math.subset(this.Rel, math.index(0, 0), cs)
                this.Rel = math.subset(this.Rel, math.index(0, 1), sn)

                this.Rel = math.subset(this.Rel, math.index(1, 0), -sn)
                this.Rel = math.subset(this.Rel, math.index(1, 1), cs)

                this.Rel = math.subset(this.Rel, math.index(2, 2), cs)
                this.Rel = math.subset(this.Rel, math.index(2, 3), sn)

                this.Rel = math.subset(this.Rel, math.index(3, 2), -sn)
                this.Rel = math.subset(this.Rel, math.index(3, 3), cs)

            case 'PP2':
                var cs = this.cs
                var sn = this.sn
                //Create after the matrix Rel of this element

                break;
            default:
                console.log('Verifique o elemento colocado')
                break;
        }
    }

    //Degree of freedom (DOF) for compose element in the global stiffness matrix
    DOFelement(glno, no, nglno){
        var nnoselem = this.nnoselem
        var V = 0
        var gle = math.zeros([1,nnoselem*nglno])
        
        var node
        var value
        for(var i = 0 ; i < this.nnoselem; i++){
            for(var j = 0 ; j<this.nglno; j++){
                node = no.subset(math.index(0, i))-1
                value = glno.subset(math.index(node, j))
                gle = math.subset(gle, math.index(0, V), value)                
                V = V + 1
            }
        }
        return gle
    }
   
}