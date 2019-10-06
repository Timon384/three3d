window.onload = function () {
// задаем параметры окна (на всю страницу)
    var width = window.innerWidth;
    var height = window.innerHeight;
    let canvas = document.getElementById (`canvas`)
    canvas.setAttribute (`width`, width);
    canvas.setAttribute (`height`, height);
let size_grid = 15;
var controls;
let matrix = matrixArray(size_grid,size_grid);// генерируем новую матрицу
let matrix_balls = matrixArray_ball(size_grid,size_grid,width,height); // генерируем новую матрицу balls
console.log (matrix_balls);
/*console.log (matrix_balls);*/
// выбор сетки

// функция создания новой матрицы
function matrixArray(rows,columns){
  let arr = new Array();
  for(var i=0; i<rows; i++){
    arr[i] = new Array();
    for(var j=0; j<columns; j++){
    n =Math.random();
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
        let n =  new balls (i*height/rows + j*height/rows/2, j*height/columns + height/columns/2, 100, 0.001, 0.001, 0.001);
        arr[i][j] = n;
        } else {arr[i][j] = 0;}

    }
  }
  return arr;
}

    let renderer = new THREE.WebGLRenderer({canvas: canvas}); // создаем рендеринг
    renderer.setClearColor (0xffffff); // задаем цвет фона
// создание сцены
    let scene = new THREE.Scene();
// создание камеры
    let camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
    camera.position.set (0, -1200, 450);
    camera.lookAt( scene.position );

// создание света
    let light = THREE.AmbientLight (0xffffff);
    scene.add(light); // добавляем свет в сцену
// прокрутка мышью
    controls = new THREE.OrbitControls(camera, renderer.domElement);


    let ball = new THREE.SphereGeometry (20, 12, 12);
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true}); // создание материала

for(var i=0; i<size_grid; i++){
    for(var j=0; j<size_grid; j++){
        if ( matrix_balls[i][j] !== 0) {
    let mesh = new THREE.Mesh (ball, material); // создание сетки для фигуры
    mesh.position.x = matrix_balls[i][j].positionX;
    mesh.position.y = matrix_balls[i][j].positionY;
    mesh.position.z = matrix_balls[i][j].positionZ;
    scene.add (mesh);
        } else {}

    }
  }

    let geometry = new THREE.PlaneGeometry( height, height, size_grid, size_grid); // создание геометрической фигуры
    let mesh = new THREE.Mesh (geometry, material);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = -20;
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