
//--------Verson 1.0 - 18/12/2021
//-----------Documentation
//this class was created to generate a cross sections object
//All the atributes are defined in the constructor depends on element type
//it does not have units in this class

//-----------Use way
//Instatiate this way: cross1 = new crossSection(type)
//

//--------Created by
//Professor Marcel Willian Reis Sales
//for reference use Sales, M., W., R.

class crossSection {
    constructor(type,number) {
        this.number = number
        this.name
        this.type = type

        switch (type) {
            case 'TP2':
                this.A
                break;

            default:
                break;
        }

    }

    crossSectionTruss(struct, A){  
        //%___Area  
        this.A = A
        struct.propgeo = math.subset(struct.propgeo, math.index(this.number-1, 0), this.number)
        struct.propgeo = math.subset(struct.propgeo, math.index(this.number-1, 1), struct.matrixOfcrossSec[this.number-1].A)
        
    }

}