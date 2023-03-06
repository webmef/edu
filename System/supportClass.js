
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

class support {
    constructor(type, number) {
        this.number = number
        this.name

        switch (type) {
            case 'TP2':
                this.rtx
                this.rty
                break;

            default:
                break;
        }
    }

    //set the structure object, number o support and node object
    setSupportNode(struct, NumberOfSup, node, rtx, rty){  
        //setting the rtx and rty values.
        this.rtx = rtx
        this.rty = rty

        //%__no__rtx_rty 
        struct.restrsap = math.subset(struct.restrsap, math.index(NumberOfSup, 0), node.number)
        struct.restrsap = math.subset(struct.restrsap, math.index(NumberOfSup, 1), struct.matrixOfsup[NumberOfSup].rtx)
        struct.restrsap = math.subset(struct.restrsap, math.index(NumberOfSup, 2), struct.matrixOfsup[NumberOfSup].rty)
        
        
    }
}