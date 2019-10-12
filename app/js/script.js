window.onload = function () {
// задаем параметры окна (на всю страницу)
    var width = window.innerWidth;
    var height = window.innerHeight;
    var objects = [];
    this.mouse2D = new THREE.Vector3( 0, 0, 0.5 );
    let canvas = document.getElementById (`canvas`)
    canvas.setAttribute (`width`, width);
    canvas.setAttribute (`height`, height);
    let size_grid = 20; // задаем размеры сетки

let matrix = matrixArray(size_grid,size_grid);// генерируем новую матрицу
let matrix_balls = matrixArray_ball(size_grid,size_grid,width,height); // генерируем новую матрицу balls
console.log (matrix_balls);


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
function matrixArray_ball(rows,columns,height,height){
class balls {
constructor (positionX,positionY,positionZ,rotationX,rotationY,rotationZ,visible_balls) {
this.positionX = positionX;
this.positionY = positionY;
this.positionZ = positionZ;
this.rotationX = rotationX;
this.rotationY = rotationY;
this.rotationZ = rotationZ;
this.visible_balls = visible_balls;
let n;
}
}

  let arr = new Array();
  for(var i=0; i<size_grid; i++){
    arr[i] = new Array();
    for(var j=0; j<size_grid; j++){
        if ( matrix[i][j] === 1) {

        n = new balls (i*height/rows + height/rows/2 - height/2, j*height/columns + height/columns/2 -height/2, height/size_grid/2.5, 0.001, 0.001, 0.001, true);
        arr[i][j] = n;
        } else {
        n = new balls (i*height/rows + height/rows/2 - height/2, j*height/columns + height/columns/2 -height/2, height/size_grid/2.5, 0.001, 0.001, 0.001, false);
        arr[i][j] = n;
       }

    }
  }
  return arr;
}

// создаем рендеринг
    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor (0xF0F6FB); // задаем цвет фона
// создание сцены
    let scene = new THREE.Scene();
// создание камеры
    let camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 10000);
    camera.position.set (0, -1100, 900);
    camera.lookAt( scene.position );
// создание света
    var light = new THREE.AmbientLight (0xFFFFFF);
    scene.add(light); // добавляем свет в сцену


// вращение мышью
    let controls = new THREE.OrbitControls(camera, canvas);
    controls.minAzimuthAngle = 0;
    controls.maxAzimuthAngle = 0;
    controls.minPolarAngle = Math.PI/1.7;
    controls.maxPolarAngle = Math.PI/1.1;
    controls.enableDamping = 0.1;
    controls.rotateSpeed = 5;

 /*// вспомогательные векторы координат (убрать в релизе)
    let axesHelper = new THREE.AxesHelper( 200 );
    scene.add( axesHelper );*/

   // координаты мышки

   let projector = new THREE.Projector();
   let vector = new THREE.Vector3(
        ( event.clientX / width ) * 2 - 1,
      - ( event.clientY / height ) * 2 + 1,
        1 );
        console.log (event.clientX);
    projector.unprojectVector( vector, camera );
    let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    let intersects = raycaster.intersectObjects(objects);

function mouseMove( event )
{
	// update the mouse variable
	mouse2D.x =   ( event.clientX / window.innerWidth  ) * 2 - 1;
	mouse2D.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function mouseClick( event )
{
	console.log ('click')
}
    //  Создание текстуры
    let texture_ball = THREE.ImageUtils.loadTexture('app/static/images/ameba_green.jpg'); //определяем текстуру шара
    let texture_board = THREE.ImageUtils.loadTexture('app/static/images/stone.jpg'); //определяем текстуру плоскости
    let texture_line = THREE.ImageUtils.loadTexture('app/static/images/gradient.jpg'); //определяем текстуру плоскости

    // создание объектов
   /* let geometry_text = new THREE.TextGeometry(); // создание плоскости*/
    let geometry_plane = new THREE.PlaneGeometry( height, height, size_grid, size_grid); // создание плоскости
    let ball = new THREE.SphereGeometry (height/size_grid/2, 12, 12); // создание шарика
    let geometry_lines_x = new THREE.BoxGeometry(height, 4, 4); // создание линий сетки по оси х
    let geometry_lines_y = new THREE.BoxGeometry(4, height, 4); // создание линий сетки по оси у
   // материалы
    let basic_material = new THREE.MeshBasicMaterial( {color: 0x000000} ); // создание базового материала
    let material_lines = new THREE.MeshLambertMaterial( {map: texture_line} ); // создание материала
    let material_ball = new THREE.MeshLambertMaterial( {map: texture_ball} ); // создание материала
    let material_ball_transparence = new THREE.MeshPhysicalMaterial( {map: texture_ball, transparent: true, transparency: 1} ); // создание прозрачного материала
    let material_board = new THREE.MeshLambertMaterial( {map: texture_board} ); // создание материала



// отображение массива шариков
for(var i=0; i<size_grid; i++){
    for(var j=0; j<size_grid; j++){

        if ( matrix_balls[i][j].visible_balls !== false) {
    let mesh = new THREE.Mesh (ball, material_ball);
    mesh.position.x = matrix_balls[i][j].positionX;
    mesh.position.y = matrix_balls[i][j].positionY;
    mesh.position.z = matrix_balls[i][j].positionZ;
    scene.add (mesh);
    objects.push (mesh);
        } else {
        let mesh = new THREE.Mesh (ball, material_ball_transparence);
    mesh.position.x = matrix_balls[i][j].positionX;
    mesh.position.y = matrix_balls[i][j].positionY;
    mesh.position.z = matrix_balls[i][j].positionZ;
    scene.add (mesh);
    objects.push (mesh);
        }
    }
  }
// генератор сетки
  for(var i=0; i<=size_grid; i++){
  let mesh_lines_y = new THREE.Mesh (geometry_lines_y, material_lines);
  scene.add (mesh_lines_y);
  mesh_lines_y.position.x = i*height/size_grid-height/2;
  mesh_lines_y.position.z = 2;
    for(var j=0; j<=size_grid; j++){
    let mesh_lines_x = new THREE.Mesh (geometry_lines_x, material_lines);
    scene.add (mesh_lines_x);
    mesh_lines_x.position.y = i*height/size_grid-height/2;
    mesh_lines_x.position.z = 2;

    }
  }
    let mesh = new THREE.Mesh (geometry_plane, material_board);
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
    document.addEventListener( 'mousemove', mouseMove,  false );
	document.addEventListener( 'mousedown', mouseClick, false );
}

loop (); // вызов созданной сцены



}