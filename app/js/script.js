window.onload =  async function () {
// задаем параметры окна (на всю страницу)
    let width = window.innerWidth;
    let height = window.innerHeight;
    var objects = [];
    var loader = new THREE.FontLoader();
    let canvas = document.getElementById (`canvas`)
    canvas.setAttribute (`width`, width);
    canvas.setAttribute (`height`, height);
    let size_grid = 20; // задаем размеры сетки
    const font = await loadFont('js/fonts/helvetiker_bold.typeface.json'); // загрузка шрифта
    let matrix = matrixArray(size_grid,size_grid);// генерируем новую матрицу
    var matrix_balls = matrixArray_ball(size_grid,size_grid,width,height); // генерируем новую матрицу balls



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
  for(let i=0; i<size_grid; i++){
    arr[i] = new Array();
    for(let j=0; j<size_grid; j++){
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
    renderer.setClearColor (0x000000); // задаем цвет фона
// создание сцены
    let scene = new THREE.Scene();
    scene.position.x = -250;
    console.log (scene.position);
// создание камеры
    let camera = new THREE.PerspectiveCamera(40, width/height, 0.1, 10000);
    camera.position.set (0, -1100, 900);
    camera.lookAt( scene.position );
// создание света
    var light = new THREE.AmbientLight (0xFFFFFF); // добавляем свет в сцену


    /*let skyColor =0xB1E1FF;
    let groundColor = 0xB27120;
    let intensity = 1;
    var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);*/


    /*var light = new THREE.PointLight( 0xFFFFFF, 1, 1000 );
    light.position.set( 150, -150, 150 );


/*const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(100, -100, 100);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);*/

scene.add(light);
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
console.log (matrix_balls);


   // установка шариков
function onDocumentMouseDown () {
   var projector = new THREE.Projector();
   var vector = new THREE.Vector3(
        ( event.clientX / width ) * 2 - 1,
      - ( event.clientY / height ) * 2 + 1,
        1);

    projector.unprojectVector( vector, camera );
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(objects);
    let selectedObject;
    if (intersects.length > 0) {
    for(let i=0; i<size_grid; i++){
        for(let j=0; j<size_grid; j++){
            if ( matrix_balls[i][j].positionX === intersects[0].object.position.x && matrix_balls[i][j].positionY ===
            intersects[0].object.position.y && matrix_balls[i][j].positionZ === intersects[0].object.position.z) {
            if (matrix_balls[i][j].visible_balls === true) {
            console.log (intersects[0].object.name);
            matrix_balls[i][j].visible_balls = false;
            selectedObject = scene.getObjectByName(intersects[0].object.name);
            selectedObject.material = material_ball_transparence;
            } else {matrix_balls[i][j].visible_balls = true;
            console.log (intersects[0].object.name);
            selectedObject = scene.getObjectByName(intersects[0].object.name);
           selectedObject.material = material_ball;

            }

            } else {}
    }
  }
    } else {}
console.log (matrix_balls)
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
    // фцункция создания геометрии текста
    function create_text_geometry (texts,font,size,height,curveSegments,bevelEnabled,bevelThickness,bevelSize,bevelSegments) {
    let geometry_text = new THREE.TextBufferGeometry(texts, { // создание геометрии текста
        font: font,
        size: size,
        height: height,
        curveSegments: curveSegments,
        bevelEnabled: bevelEnabled,
        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelSegments: bevelSegments,
      });
      return geometry_text;
}

   // материалы
    let basic_material = new THREE.MeshBasicMaterial( {color: 0x000000} ); // создание базового материала
    let material_lines = new THREE.MeshLambertMaterial( {map: texture_line} ); // создание материала
    let material_ball = new THREE.MeshLambertMaterial( {map: texture_ball} ); // создание материала
    let material_ball_transparence = new THREE.MeshPhysicalMaterial( {map: texture_ball, transparent: true, transparency: 1} ); // создание прозрачного материала
    let material_board = new THREE.MeshLambertMaterial( {map: texture_board} ); // создание материала
    let material_text = new THREE.MeshPhongMaterial( {side: THREE.DoubleSide, color: 0x15ee00});



// функция массива шариков
function ballsView () {
objects = [];
/*scene.children = [];*/
for(var i=0; i<size_grid; i++){
    for(var j=0; j<size_grid; j++){

        if ( matrix_balls[i][j].visible_balls !== false) {
    let mesh = new THREE.Mesh (ball, material_ball);
    mesh.position.x = matrix_balls[i][j].positionX;
    mesh.position.y = matrix_balls[i][j].positionY;
    mesh.position.z = matrix_balls[i][j].positionZ;
    mesh.name = "i-"+i+" j-"+j;
    scene.add (mesh);
    objects.push (mesh);
        } else {
        let mesh = new THREE.Mesh (ball, material_ball_transparence);
    mesh.position.x = matrix_balls[i][j].positionX;
    mesh.position.y = matrix_balls[i][j].positionY;
    mesh.position.z = matrix_balls[i][j].positionZ;
    mesh.name = "i-"+i+" j-"+j;
    scene.add (mesh);
    objects.push (mesh);
        }
    }
  }
  console.log (scene)
 }

// функция генерации сетки
function create_grid () {
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
}
// генератор доски
function board () {
    let mesh = new THREE.Mesh (geometry_plane, material_board);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
    scene.add (mesh);
}

// функция отображения названия игры
function text_game () {

let mesh_text = new THREE.Mesh (
create_text_geometry ("GAME LIFE",font,100,20,12,true,0.15,0.3,5 ),
material_text);
mesh_text.position.x = -350;
mesh_text.position.y =  200;
mesh_text.position.z = 300;
mesh_text.rotation.x = 1.59;
scene.add (mesh_text);
}
// функция отображения кнопки
function buttons (text_button,x,y,z,rotationX,rotationY,rotationZ) {
let mesh_text = new THREE.Mesh (
create_text_geometry (text_button,font,80,20,12,true,0.15,0.3,5 ),
material_text);
mesh_text.position.x = x;
mesh_text.position.y =  y;
mesh_text.position.z = z;
mesh_text.rotation.x = rotationX;
mesh_text.rotation.y = rotationY;
mesh_text.rotation.z = rotationZ;
mesh_text.name = text_button;
scene.add (mesh_text);
}

ballsView ();
create_grid ();
board ();
text_game();
buttons("button1", 500, 000, 300, 1.59,-0.19,0);
buttons("button2", 500, 000, 150,1.59,-0.19,0);
buttons("button3", 500, 000, 00,1.59,-0.19,0);
buttons("butt4", -300, -400, -100,1.4,0.0,0);
buttons("butt5", 100, -400, -100,1.4,0.0,0);
// создаем движение
function loop() {
/*mesh.position.z = 50;
mesh.rotation.z += 0.001;*/

    controls.update();
    renderer.render (scene, camera); // включаем в рендеринг сцену и камеру
    requestAnimationFrame (function () {loop();}); // включаем цикл
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
}

loop (); // вызов созданной сцены

// загрузим шрифт


function loadFont(url) {
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    }

console.log (font);

}