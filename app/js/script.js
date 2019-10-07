window.onload = function () {
// задаем параметры окна (на всю страницу)
    var width = window.innerWidth;
    var height = window.innerHeight;
    let canvas = document.getElementById (`canvas`)
    canvas.setAttribute (`width`, width);
    canvas.setAttribute (`height`, height);
let size_grid = 10;
var controls;
let matrix = matrixArray(size_grid,size_grid);// генерируем новую матрицу
let matrix_balls = matrixArray_ball(size_grid,size_grid,width,height); // генерируем новую матрицу balls
console.log (matrix_balls);
// выбор сетки

// функция создания новой матрицы
function matrixArray(rows,columns){
  let arr = new Array();
  for(var i=0; i<rows; i++){
    arr[i] = new Array();
    for(var j=0; j<columns; j++){
    n =Math.random();/*Math.random() вернуть после отладки*/
        if ( n <= 0.8) {
        arr[i][j] = 0;
        } else {arr[i][j] = 1;}

    }
  }
  return arr;
}







// генерируем параметры каждого шарика
function matrixArray_ball(rows,columns,height,height){console.log(width,height)
  let arr = new Array();
  for(var i=0; i<size_grid; i++){
    arr[i] = new Array();
    for(var j=0; j<size_grid; j++){
        if ( matrix[i][j] === 1) {
        class balls {
constructor (positionX,positionY,positionZ,rotationX,rotationY,rotationZ) {
this.positionX = positionX;
this.positionY = positionY;
this.positionZ = positionZ;
this.rotationX = rotationX;
this.rotationY = rotationY;
this.rotationZ = rotationZ;
}
}
        let n =  new balls (i*height/rows + height/rows/2 - height/2, j*height/columns + height/columns/2 -height/2, height/size_grid/2.5, 0.001, 0.001, 0.001);
        arr[i][j] = n;
        } else{arr[i][j] = 0;}

    }
  }
  return arr;
}

    let renderer = new THREE.WebGLRenderer({canvas: canvas}); // создаем рендеринг
    renderer.setClearColor (0xffffff); // задаем цвет фона
// создание сцены
    let scene = new THREE.Scene();
// создание камеры
    let camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 10000);
    camera.position.set (0, 0, 1000);
    camera.lookAt( scene.position );

// создание света
    var light = new THREE.AmbientLight (0xffffff);
    scene.add(light); // добавляем свет в сцену

// прокрутка мышью
    controls = new THREE.OrbitControls(camera, renderer.domElement);

/*scene.add( line );*/
    let texture_ball = THREE.ImageUtils.loadTexture('app/static/images/ameba_green.jpg'); //определяем текстуру шара
    let texture_board = THREE.ImageUtils.loadTexture('app/static/images/stone.jpg'); //определяем текстуру подложки

    // создание объектов
    let ball = new THREE.SphereGeometry (height/size_grid/2.5, 12, 12); // создание шарика
   /* let line = new THREE.Line( geometry, material );*/
    let material_ball = new THREE.MeshLambertMaterial( {map: texture_ball} ); // создание материала
    let material_board = new THREE.MeshLambertMaterial( {map: texture_board} ); // создание материала
//   Создание текстуры

for(var i=0; i<size_grid; i++){
    for(var j=0; j<size_grid; j++){
        if ( matrix_balls[i][j] !== 0) {
    let mesh = new THREE.Mesh (ball, material_ball); // создание сетки для фигуры
    mesh.position.x = matrix_balls[i][j].positionX;
    mesh.position.y = matrix_balls[i][j].positionY;
    mesh.position.z = matrix_balls[i][j].positionZ;
    scene.add (mesh);
        } else {}
    }
  }

    let geometry = new THREE.PlaneGeometry( height, height, size_grid, size_grid); // создание геометрической фигуры
    let mesh = new THREE.Mesh (geometry, material_board);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
    scene.add (mesh);

// создаем движение
function loop() {
/*mesh.position.z = 50;
mesh.rotation.z += 0.001;*/
controls.update();
    renderer.render (scene, camera); // включаем в рендеринг сцену и камеру
    requestAnimationFrame (function () {loop();}); // включаем цикл
}

loop (); // вызов созданной сцены

}