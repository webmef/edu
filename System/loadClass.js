//--------Verson 1.0 - 18/12/2021
//-----------Documentation
//this class was created to generate objects type of loads
//this objects a matrix of loads which will be used to solve structures
//There are two methods to input nodal, distributed
//it does not have units in this class

//-----------Use way
//Instatiate this way: node1 = new load(type_load)
//type load is a constructor parameter and can be 'nodal' or 'distributed'
//force is matrix which store the load

//-----------Use way
//Instatiate this way: el = new load(type_load)
//Number is an atribute 
//The type_load can be setted like 'nodal' or 'distributed'
//The object generated will have the type_load atribute
//Methods 'nodalLoad(fx, fy)' or 'distributedLoad(fdx, fdy)' can be used to create a matrix of load

//--------Created by
//Professor Marcel Willian Reis Sales
//for reference use Sales, M., W., R.

class load {
    constructor(type_load, n) {
        this.number = n
        this.type_load = type_load
        this.fx
        this.fy
        this.fdx
        this.fdy
        this.forceDirection = ''

    }

    nodalLoad(struct, node, NumberOfLoad, fx, fy) {
        //setting the fx and fy values.
        this.fx = fx
        this.fy = fy

        //%__no____fx_____fy
        struct.cargasnos = math.subset(struct.cargasnos, math.index(NumberOfLoad, 0), node.number)
        struct.cargasnos = math.subset(struct.cargasnos, math.index(NumberOfLoad, 1), struct.matrixOfNosCar[NumberOfLoad].fx)
        struct.cargasnos = math.subset(struct.cargasnos, math.index(NumberOfLoad, 2), struct.matrixOfNosCar[NumberOfLoad].fy)
    }

    distributedLoad(struct, elem, fdx, fdy) {
        this.fx = fx
        this.fy = fy
    }
}
