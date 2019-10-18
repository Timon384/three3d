window.onload =  async function () {
// задаем параметры окна (на всю страницу)
    let width = window.innerWidth;
    let height = window.innerHeight;
    let objects = [];
    let loader = new THREE.FontLoader();
    let canvas = document.getElementById (`canvas`)
    canvas.setAttribute (`width`, width);
    canvas.setAttribute (`height`, height);
    let size_grid = 20; // задаем размеры сетки
    const font = await loadFont('js/fonts/helvetiker_bold.typeface.json'); // загрузка шрифта
    let matrix = matrixArray(size_grid,size_grid);// генерируем новую матрицу

    let matrix_balls = matrixArray_ball(size_grid,size_grid,width,height); // генерируем новую матрицу balls

    let OBJECT;
    let LOADING_MANAGER = new THREE.LoadingManager();
    let OBJ_LOADER = new THREE.OBJLoader(LOADING_MANAGER);
    let IMAGE_LOADER = new THREE.ImageLoader(LOADING_MANAGER);


// функция создания новой матрицы
function matrixArray(rows,columns){
  let arr = new Array();
  for(let i=0; i<rows; i++){
    arr[i] = new Array();
    for(let j=0; j<columns; j++){
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
    scene.position.x = -380;
// создание камеры
    let camera = new THREE.PerspectiveCamera(40, width/height, 0.1, 10000);
    camera.position.set (0, -1100, 700);


// создание света
    /*let light = new THREE.AmbientLight (0xFFFFFF,1.0);*/
    // добавляем точечный свет
    let light = new THREE.PointLight( 0xFFFFFF, 1.0, 1000 );
    let light1 = new THREE.PointLight( 0xFFFFFF, 2.0, 1000 );
    let light2 = new THREE.PointLight( 0xFFFFFF, 2.0, 1000 );
    let light3 = new THREE.PointLight( 0xFFFFFF, 2.0, 1000 );
// устанавливаем координаты света
    light.position.set( 800, -350, 450 );
    light1.position.set( -100, -100, 350 );
    light2.position.set( 200, -550, -50 );
    light3.position.set( 1100, -450, -50 );
 /* let pointLightHelper = new THREE.PointLightHelper( light, 100 ); // вспомогательные вектора света
    let pointLightHelper1 = new THREE.PointLightHelper( light1, 100 );
    let pointLightHelper2 = new THREE.PointLightHelper( light2, 100 );
    let pointLightHelper3 = new THREE.PointLightHelper( light3, 100 );
    scene.add(pointLightHelper);
    scene.add(pointLightHelper1);
    scene.add(pointLightHelper2);
    scene.add(pointLightHelper3);*/
scene.add(light,light1,light2,light3);

// вращение мышью и ограничения вращения
    let controls = new THREE.OrbitControls(camera, canvas);
    controls.minAzimuthAngle = -Math.PI/10.0;
    controls.maxAzimuthAngle = Math.PI/10.0;
    controls.minPolarAngle = Math.PI/1.4;
    controls.maxPolarAngle = Math.PI/1.1;
    controls.maxDistance = 2500;
    controls.enableDamping = 0.2;
    controls.rotateSpeed = 5;
    controls.saveState();




   // установка шариков
 async function onDocumentMouseDown () {
   let projector = new THREE.Projector();
   let vector = new THREE.Vector3(
        ( event.clientX / width ) * 2 - 1,
      - ( event.clientY / height ) * 2 + 1,
        1);

    projector.unprojectVector( vector, camera );
    let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    let intersects = raycaster.intersectObjects(objects);
    let selectedObject;
    if (intersects.length > 0) {
    /*selectedObject = scene.getObjectByName(intersects[0].object.name);*/

    if (intersects[0].object.name === "Random") {  // отработка клика по кнопке Random
    for ( let i=25;i>0;i=i-3) {
    await button_click(intersects,i);
    }
    button_Random ();
        } else if (intersects[0].object.name === "Start game") { // отработка клика по кнопке Start game
    for ( let i=25;i>0;i=i-3) {
    await button_click(intersects,i);
    }
    button_start ();

    } else if (intersects[0].object.name === "Clear") { // отработка клика по кнопке Clear
    for ( let i=25;i>0;i=i-3) {
    await button_click(intersects,i);
    }
    button_clear ();
        } else if (intersects[0].object.name === "butt4") {// отработка клика по кнопке butt4
    for ( let i=20;i>0;i=i-3) {
    await button_click(intersects,i);
    }
        } else if (intersects[0].object.name === "butt5") {// отработка клика по кнопке butt5
    for ( let i=20;i>0;i=i-3) {
    await button_click(intersects,i);
    }
        } else
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
    let material_ball_transparence = new THREE.MeshPhysicalMaterial( { transparent: true, transparency: 1.0} ); // создание прозрачного материала
    material_ball_transparence.opacity = 0;
    let material_board = new THREE.MeshLambertMaterial( {map: texture_board} ); // создание материала
    let material_text = new THREE.MeshPhongMaterial( {side: THREE.DoubleSide, color: 0x11be00});
    let material_cube = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

// загружаем фон (бек)
function background() {
    const sphere = new THREE.SphereGeometry(2000, 128, 128);
    sphere.scale(-1, 1, 1);
    const texture = new THREE.Texture();
    const material = new THREE.MeshBasicMaterial({
        map: texture
    });
    IMAGE_LOADER.load('./static/images/background_5.jpg', (image) => {
        texture.image = image;
        texture.needsUpdate = true;
    });
    mesh_arround = new THREE.Mesh(sphere, material);
    mesh_arround.rotation.x = 1.57;
    scene.add(mesh_arround);
}

// функция массива шариков
function ballsView () {
objects = [];
for(let i=0; i<size_grid; i++){
    for(let j=0; j<size_grid; j++){

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
 }

// функция генерации сетки
function create_grid () {
  for(let i=0; i<=size_grid; i++){
  let mesh_lines_y = new THREE.Mesh (geometry_lines_y, material_lines);
  scene.add (mesh_lines_y);
  mesh_lines_y.position.x = i*height/size_grid-height/2;
  mesh_lines_y.position.z = 1;
    for(let j=0; j<=size_grid; j++){
    let mesh_lines_x = new THREE.Mesh (geometry_lines_x, material_lines);
    scene.add (mesh_lines_x);
    mesh_lines_x.position.y = i*height/size_grid-height/2;
    mesh_lines_x.position.z = 1;

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
let text_geometry = new create_text_geometry ("GAME LIFE",font,100,20,12,true,10,5,5 );
let mesh_text = new THREE.Mesh (text_geometry,material_text);
mesh_text.position.x = -350;
mesh_text.position.y =  200;
mesh_text.position.z = 300;
mesh_text.rotation.x = 1.59;
scene.add (mesh_text);
}
// функция отображения кнопки
function buttons (text_button,x,y,z,rotationX,rotationY,rotationZ) {
let mesh_text = new THREE.Mesh (
create_text_geometry (text_button,font,80,20,12,true,10,5,5 ),
material_text);
mesh_text.position.x = x;
mesh_text.position.y =  y;
mesh_text.position.z = z;
mesh_text.rotation.x = rotationX;
mesh_text.rotation.y = rotationY;
mesh_text.rotation.z = rotationZ;
mesh_text.name = text_button;
scene.add (mesh_text);
objects.push (mesh_text)
}

ballsView ();
create_grid ();
board ();
text_game();
background();
loop (); // вызов созданной сцены

// координаты кнопок
buttons("Random", 500, 000, 150, 1.59,-0.19,0);
buttons("Start game", 500, 000, 300,1.59,-0.19,0);
buttons("Clear", 500, 000, 00,1.59,-0.19,0);
buttons("butt4", -300, -400, -100,1.4,0.0,0);
buttons("butt5", 100, -400, -100,1.4,0.0,0);

// создаем движение
function loop() {
/*mesh.position.z = 50;
mesh.rotation.z += 0.001;*/
/*initEventListeners();*/
    controls.update();
    renderer.render (scene, camera); // включаем в рендеринг сцену и камеру
    requestAnimationFrame (function () {loop();}); // включаем цикл
	document.addEventListener( 'mousedown', onDocumentMouseDown, false ); // отслеживание наведения мышки на объект
    document.addEventListener( 'dblclick', cameraCenterPosition, false ); // событие центрирование камеры по двойному клику
}



// загрузим шрифт
function loadFont(url) {
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });
    }

// генерация нового поля с шариками по крику кнопки "Random"
function button_Random () {
let name;
matrix = matrixArray(size_grid,size_grid);// генерируем новую матрицу
matrix_balls = matrixArray_ball(size_grid,size_grid,width,height);// генерируем новую матрицу balls

for(let i=0; i<size_grid; i++){
    for(let j=0; j<size_grid; j++){

            name = "i-"+i+" j-"+j;

            for  (let n=0;n<scene.children.length; n++) {
            if (scene.children[n].name === name) {
                if (matrix_balls[i][j].visible_balls === false) {
                scene.children[n].material = material_ball_transparence;
                } else {
                scene.children[n].material = material_ball;
                }
            }
            }

    }
  }
}

// кнопка старт игры
function button_start () {
let name;
  for(let i=0; i<size_grid; i++){
    for(let j=0; j<size_grid; j++){
    name = "i-"+i+" j-"+j;
        for  (let n=0;n<scene.children.length; n++) {
            if (scene.children[n].name === name) {
                if (scene.children[n].material === material_ball) {
                matrix[i][j] = 1;
                /*scene.children[n].material = material_ball_transparence;*/
                } else {
                matrix[i][j] = 0;
                }
            }
            }

    }
  }
console.log (matrix);
}
// кнопка очистка поля
function button_clear () {
for(let i=0; i<size_grid; i++){
    for(let j=0; j<size_grid; j++){
            name = "i-"+i+" j-"+j;
            for  (let n=0;n<scene.children.length; n++) {
            if (scene.children[n].name === name) {
                scene.children[n].material = material_ball_transparence;
            }
         }

    }
  }
}


// функция паузы
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// функция центрирование камеры по двойному клику
function cameraCenterPosition () {
controls.reset();
}
// отработка движения при клике
async function button_click(intersects,i) {
    intersects[0].object.position.y = intersects[0].object.position.y -i;
    intersects[0].object.position.z = intersects[0].object.position.z -i;
    await sleep(10)
    intersects[0].object.position.y = intersects[0].object.position.y +i;
    intersects[0].object.position.z = intersects[0].object.position.z +i;
    return intersects;
}
}