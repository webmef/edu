//--------Verson 1.0 - 18/12/2021
//-----------Documentation
//This class was created to generate objects type of material

//it does not have units in this class

//-----------Use way
//Instatiate this way: mat = new material(E)
//new atributes of material can be setted



//--------Created by
//Professor Marcel Willian Reis Sales
//for reference use Sales, M., W., R.

class material {
    constructor(number) {
        this.number = number
        this.name
        this.E
        this.nu
        this.alpha
    }

    //set material which will be used in the the 
    materialTruss(struct, NumberOfmat, E, alpha) {
        //%_______E________ALPHA
        this.E = E
        this.alpha = alpha
        struct.propmats = math.subset(struct.propmats, math.index(NumberOfmat, 0), struct.matrixOfMat[NumberOfmat].E)
        struct.propmats = math.subset(struct.propmats, math.index(NumberOfmat, 1), struct.matrixOfMat[NumberOfmat].alpha)
    }
}