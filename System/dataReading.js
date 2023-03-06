
 //create a new strucutre
 var struct = new structure()

 //##################LEITURA DE DADOS############################
 //strucutre type element
 var type = 'TP2'

 //create nodes
 struct.createNode(0, 0) //node 1
 struct.createNode(500, 0) //node 2
 struct.createNode(1000, 500) //node 3


 //create materiais and setting in the propmat matrix of the structure  
 struct.createMaterial(type)
 struct.matrixOfMat[struct.nmats - 1].materialTruss(struct, 0, 200000, 0.00010)


 //create new cross sections and setting in the propgeo of the structure
 struct.createCrossSection(type)
 struct.matrixOfcrossSec[struct.nsecs - 1].crossSectionTruss(struct, 100)

 //create new elements and setting in the propelems of the strucutre
 //element 1
 struct.createElements(type)
 struct.matrixOfelems[struct.nelems - 1].elementTruss(struct, 0, struct.matrixOfNodes[0].number,
   struct.matrixOfNodes[2].number, struct.matrixOfMat[0].number,
   struct.matrixOfcrossSec[0].number)

 //element 2
 struct.createElements(type)
 struct.matrixOfelems[struct.nelems - 1].elementTruss(struct, 1, struct.matrixOfNodes[1].number,
   struct.matrixOfNodes[2].number, struct.matrixOfMat[0].number,
   struct.matrixOfcrossSec[0].number)


 //create a new supports
 //for rtx and rty use: 0 fro free and 1 for fixedS 
 //REMEMBER ALL STRUCTURES MUST HAVE AT LEAST THREE SUPPORTS 
 struct.createSupport(type)
 struct.matrixOfsup[struct.naps - 1].setSupportNode(struct, 0, struct.matrixOfNodes[0], 1, 1)
 struct.createSupport(type)
 struct.matrixOfsup[struct.naps - 1].setSupportNode(struct, 1, struct.matrixOfNodes[1], 1, 1)


 //create new loads
 //%__no____fx_____fy
 struct.createLoads('nodal')
 struct.matrixOfNosCar[struct.nnoscar - 1].nodalLoad(struct, struct.matrixOfNodes[2], 0, -100, 0)

 //################## 1 - LEITURA DE DADOS############################

 //################## 2 - CRIAÇÃO DA MATRIZ DE GRAUS DE LIBERDADE DA ESTRUTURA############################
 //evaluating the number of degree of freedoms and creating the matrix of dof
 struct.Grau_de_liberdade()
 //################## 2 - CRIAÇÃO DA MATRIZ DE GRAUS DE LIBERDADE DA ESTRUTURA############################

 //################### 3 - CRIAÇÃO DA MATRIZ DE RIGIDEZ DA ESTRUTURA############################
 struct.stiffnessMatrixOfStruct()
 //################### 3 - CRIAÇÃO DA MATRIZ DE RIGIDEZ DA ESTRUTURA############################

 //################### 4 - FORÇAS EXTERNAS DA ESTRUTURA###########################
 struct.externalLoads()
 //################### 4 - FORÇAS EXTERNAS DA ESTRUTURA############################

 //################### 5 - DESLOCAMENTO NODAL DA ESTRUTURA############################
 struct.nodalDisplacement()
 //################### 5 - DESLOCAMENTO NODAL DA ESTRUTURA############################


 //################## 1- LEITURA DE DADOS############################
 console.log('Tipo de elemento')
 console.log(type)
 console.log('Número de nós')
 console.log(struct.nnos)
 console.log('Número de materiais')
 console.log(struct.nmats)
 console.log('Número de seções transversais')
 console.log(struct.nsecs)
 console.log('Numero_de_elementos')
 console.log(struct.nelems)
 console.log('Numero_de_apoios')
 console.log(struct.naps)
 console.log('Numero_de_nos_carregados')
 console.log(struct.nnoscar)
 console.log('Coordenadas dos nós')
 console.log('%____X_____Y')
 console.log(struct.coordnos)
 console.log('Propriedades dos materiais')
 console.log('%_______E________ALPHA')
 console.log(struct.propmats)
 console.log('Propriedades_das_seções_transversais')
 console.log('%___Area')
 console.log(struct.propgeo)
 console.log('Propriedades_dos_elementos')
 console.log('___no1__no2_material_seção')
 console.log(struct.propelems)
 console.log('Apoios_(r=1_impedido_r=0_livre)')
 console.log('__no__rtx_rty')
 console.log(struct.restrsap)
 console.log('Nos_carregados')
 console.log('__no____fx_____fy')
 console.log(struct.cargasnos)
 //################## 1- LEITURA DE DADOS############################

 //################## 2 - CRIAÇÃO DA MATRIZ DE GRAUS DE LIBERDADE DA ESTRUTURA############################
 console.log('Número de graus de liberdade do nó')
 console.log(struct.matrixOfelems[0].nglno)
 console.log('Matrix de graus de liberdade do nó')
 console.log(struct.glno)
 console.log('Número de equações')
 console.log(struct.neq)
 //################## 2 - CRIAÇÃO DA MATRIZ DE GRAUS DE LIBERDADE DA ESTRUTURA############################

 //################### 3 - CRIAÇÃO DA MATRIZ DE RIGIDEZ DA ESTRUTURA############################
 console.log('Matriz de Rigidez da estrutura')
 console.log(struct.Kestr)
 //################### 3 - CRIAÇÃO DA MATRIZ DE RIGIDEZ DA ESTRUTURA############################


 //################### 4 - FORÇAS EXTERNAS DA ESTRUTURA############################
 console.log('Forças externas')
 console.log(struct.Festr)
 //################### 4 - FORÇAS EXTERNAS DA ESTRUTURA############################

 //################### 5 - DESLOCAMENTO NODAL DA ESTRUTURA############################
 console.log('Deslocamento nodal da estrutura')
 console.log(struct.Uestr)
 //################### 5 - DESLOCAMENTO NODAL DA ESTRUTURA############################