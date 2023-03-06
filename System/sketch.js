

function setup() {

    if (window.innerWidth < 500) {
        x = 0.98 * window.innerWidth
        y = 0.7 * window.innerHeight
    } else {
        x = 0.8 * window.innerWidth
        y = 0.8 * window.innerHeight
    }

    createCanvas(x, y, WEBGL);

    //Create a model  
    _model = new myModel()

    //Create a camera  
    view = new myView(_model)
    view.fitWorldToViewport(1.15)

    //Controlador
    control = new myControler(view)

    _objectOfDrawing = new drawClass()

    _mouseEvents = new mouseEvents(MouseEvent)

   

    noLoop()



}

function draw() {
    control.show()
}

function windowResized() {
    x = 0.8 * window.innerWidth
    y = 0.8 * window.innerHeight
    if (window.innerWidth <= 500) {
        x = 0.98 * window.innerWidth
        y = 0.7 * window.innerHeight
    }
    resizeCanvas(x, y);
    view.fitWorldToViewport(1.15)

}

/* funções de eventos do butão */

function fitButton() {
    view.fitWorldToViewport(1.1)
}

function zoonInButton() {
    view.scaleWorldWindow(1 / 1.1)
}

function zoonOutButton() {
    view.scaleWorldWindow(1.1)
}

function leftButton() {
    view.panWorldWindow(0.1, 0)
}

function rightButton() {
    view.panWorldWindow(-0.1, 0)
}

function topButton() {
    view.panWorldWindow(0, -0.1)
}

function botButton() {
    view.panWorldWindow(0, 0.1)
}

function lineButton() {
    control.curveType = 'LINE'
    control.statusLineButton = true
    control.typeClickLine = 'firstClick'
}

function polylineButton() {
    control.curveType = 'POLYLINE'
    control.statusLineButton = true
    control.typeClickLine = 'firstClick'
}


function pointButton() {
    control.curveType = 'POINT'
    control.statusPointButton = true
}

function materialButton() {
    control.statusMaterialButton = true

}

//#######BOTÕES INTERNOS DO MATERIAL#######
function acoButton() {
    control.statusMaterialButton = true
    control.createMaterial('AÇO')
}

function concretoButton() {
    control.statusMaterialButton = true
    control.createMaterial('CONCRETO')
}

function aluminioButton() {
    control.statusMaterialButton = true
    control.createMaterial('ALUMÍNIO')
}

function outrosButton() {
    control.statusMaterialButton = true
    control.createMaterial('OUTROS')
    document.getElementById('outrosButton').value = "";
}

function validaroutromaterial() {
    var outromaterial = document.getElementById("outrosButton").value;
    if (outromaterial.length > 3) {
        return true;
    } else {
        return false;
    }
}
function validarMaterial() {
    if (outromaterial()) {
        alert("Material enviado com sucesso!!");
        return true;
    } else {
        alert("Insira pelo menos um MATERIAL!")
        return false;
    }
}
//#######BOTÕES INTERNOS DO MATERIAL#######

/*
function supportButton() {  
    _objectOfDrawing.supportType = 'SEGUNDOGENERO'        
    control.CreateSupport()     
    control.statusSupportButton = true    
}*/

function sectionButton() {
    control.statusSectionButton = true
    control.secaoTransversal()
}

function forceButton() {
    _objectOfDrawing.forceType = 'VERTICAL'
    control.createForce()
    control.statusForceButton = true
}

function meshButton() {
    control.createMesh()
    redraw()
}

function runButton() {
    control.runMesh()
    redraw()
}

const button = document.getElementById('materialButton')
const popup = document.querySelector('.popup-wrapper')

button.addEventListener('click', () => {
    popup.style.display = 'block'
})

popup.addEventListener('click', Event => {
    const classNameOfClickendElemnt = event.target.classList[0]
    const classNames = ['popup-close', 'popup-wrapper', 'popup-link']
    const shouldClosePopup = classNames.some(className => className === classNameOfClickendElemnt)

    if (shouldClosePopup) {
        popup.style.display = 'none'
    }

})


//################################# CHECKBOX FUNCTIONS #######################
function checkGrid() {
    if (control.isGrid) {
        control.isGrid = false;
    } else {
        control.isGrid = true;
    }
    redraw()
}

function checkSnap() {
    if (control.isSnap) {
        control.isSnap = false
    } else {
        control.isSnap = true
    }
    redraw()
}



function checkPrimeiroGenero() {
    //window.alert("funcionou 1!!")
    _objectOfDrawing.supportType = 'PRIMEIROGENERO'
    control.CreateSupport()
    control.statuscheckPrimeiroGenero = true
    redraw()
}

function checkSegundoGenero() {
    // window.alert("funcionou 2!!")

    _objectOfDrawing.supportType = 'SEGUNDOGENERO'
    control.CreateSupport()
    control.statuscheckSegundoGenero = true
    redraw()
}

function checkTerceiroGenero() {
    //window.alert("funcionou 3!!")
    _objectOfDrawing.supportType = 'TERCEIROGENERO'
    control.CreateSupport()
    control.checkTerceiroGenero = true
    redraw()
}





//################################# CHECKBOX FUNCTIONS #######################

//################################# KEYBOARD FUNCTIONS #######################
function keyPressed(event) {
    view.moving()
    redraw()
    if (keyIsDown(70)) // tecla F
    {
        view.useLoop()
    }
    if (keyIsDown(71)) // tecla G
    {
        myCheckedGrid()
        if (checkboxGrid.elt.firstElementChild.checked) {
            checkboxGrid.elt.firstElementChild.checked = false
        } else {
            checkboxGrid.elt.firstElementChild.checked = true
        }
    }
    if (keyIsDown(76)) // tecla L
    {
        control.curveType = 'LINE'
        control.statusLineButton = true
        control.typeClickLine = 'firstClick'
    }
    if (keyIsDown(80)) // tecla p
    {
        control.curveType = 'POLYLINE'
        control.statusLineButton = true
        control.typeClickLine = 'firstClick'
    }
    if (keyIsDown(46)) { //delete
        _model.deleteShape()
    }
    if (keyIsDown(84)) { //teste buttom
        console.log(_model.m_curves.length)
        console.log(_model.m_verts.length)
    }
    if (keyIsDown(27)) {// desable Polyline button
        if (control.statusLineButton && control.curveType == 'POLYLINE') {
            control.statusLineButton = false
            control.typeCurvesToDraw()
            redraw()
        } else {
            view.fitWorldToViewport(1.1)
        }
    }
}

function keyReleased() {

}

//################################# KEYBOARD FUNCTIONS #######################

//################################# MOUSE FUNCTIONS #######################



//################################# MOUSE FUNCTIONS #######################