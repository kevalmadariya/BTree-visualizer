const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvas_width = canvas.width = 2500;
const canvas_height = canvas.height = 900;

// const canvas_width = canvas.width = 15000;
// const canvas_height = canvas.height =900;
let d = '';
let movepx = canvas.width / 2;
let movepy = 80;
let size = 0;
let root;
let arr = [];
let dy = 80;
let dx = canvas.width / 2;
let py = 80;
let px = canvas.width / 2;
let scalingFactor = 0;
let portion = '';
let treeNodes = [];
let stopx = false;
let stopy = false;
let start = 0;


class TreeNode {
    constructor(val) {
        this.data = val;
        this.left = null;
        this.right = null;
        // this.x = dx;
        this.x = 6800;
        // this.y = dy;
        this.y = 10;
        this.px = movepx;
        this.py = movepy;
        this.portion = '';
        this.aschildDir = '';
        start = 0;
        // stopx = false;
        // stopy = false;
        // console.log(dx);
    }
    update() {
        this.portion = portion;
        // this.x = 0;
        // this.y = dy; 

        //to show clear node without overridind line
        this.px = movepx;
        this.py = movepy + 25;
        
        this.aschildDir = d;
        if (this.x < dx) {
            this.x += 10;
        } else {
            this.x = dx;
            stopx = true;
        }
        if (this.y < dy) {
            this.y += 20;
        } else {
            this.y = dy;
            stopy = true;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.px, this.py);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        // ctx.restore();
        // console.log(this.px+",  "+this.py)
        ctx.beginPath();
        ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
        // ctx.arc(200,200,20,0,Math.PI*2);.
        // ctx.arc(this.x, this.y, nodeSize, 0, 2 * Math.PI); // adjust node size
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();

        ctx.fillStyle = 'black';
        // ctx.font ='20px Impact';
        ctx.font = `20px px Impact`; // adjust font size

        ctx.fillText(this.data, this.x - 15, this.y + 10, 50, 50);

        ctx.restore();
    }
}

//main
function insertInBST() {
    arr.splice(0, arr.length);
    document.getElementById('inorder').innerHTML = "";
    const val = Number(document.getElementById('insertBST').value);
    node = new TreeNode(val);
    treeNodes.push(node);
    // console.log(treeNodes);
    BST(node);
    animate(node, dy, dx);
    anim();
    inorder(root);
    console.log(arr);    
    document.getElementById('inorder').innerHTML += "inorder : "+arr;
    // tryplz();
}

// function tryplz(){
//     // let a = [500,250,700];
//     let a = [500,250,125,350,750,600,560,650,1000,126,351,601,800,550,908,123,12,355,45,1002,738,300,325,275,350.5,124,150,125.5,890,565,1001,1003,770,123.5,124.5,125.4];
//     for(let i=0;i<a.length ;i++){
//     arr.splice(0,arr.length);
//     const val = a[i];
//     node = new TreeNode(val);
//     treeNodes.push(node);
//     // console.log(treeNodes[9]);
//     BST(node);
//     animate(node);
//     inorder(root);
//     console.log(arr);
//     }
// }

// tryplz();


function BST(node) {
    if (size === 0) {
        root = node;
        size++;
        return;
    }

    let cur_pointer = root;
    let prev_pointer = root;
    let temp = 0;
    while (cur_pointer != null) {
        temp++;
        if (cur_pointer.data > node.data) {
            console.log('in left');
            prev_pointer = cur_pointer;
            cur_pointer = cur_pointer.left;
            d = 'L';
        } else {
            prev_pointer = cur_pointer;
            cur_pointer = cur_pointer.right;
            d = 'R';
        }
        if (temp === 1) {
            portion = d;
        }
    }

    if (temp >= size) {
        size = temp;
    }
    scalingFactor = temp * 60;

    px = prev_pointer.x;
    py = prev_pointer.y;
    movepx = px;
    movepy = py;

    if (d === 'L') {
        prev_pointer.left = node;
    } else {
        prev_pointer.right = node;
    }
}

function inorder(p) {
    if (p === null) {
        return;
    }
    inorder(p.left);
    arr.push(p.data);
    inorder(p.right);
}

// // Store the positions of all nodes
// function storeNodePositions(p) {
//     if (p === null) {
//         return [];
//     }

//     const positions = [];

//     function inorder(p) {
//         if (p === null) {
//             return;
//         }
//         inorder(p.left);
//         positions.push({ x: p.x, y: p.y, data: p.data });
//         inorder(p.right);
//     }

//     inorder(p);
//     return positions;
// }

function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const node of treeNodes) {
        node.draw(ctx);
    }

    requestAnimationFrame(anim);
}

// function dir_ani(node) {
//     node.update();
//     node.draw(ctx);
//     requestAnimationFrame(dir_ani);
// }



function animate(node) {
    if (node == root) {
        // node.update();
        // node.draw(ctx);
        moveNode();
        return;
    }


    if (portion === 'R') {
        if (d === 'L') px -= 325 - scalingFactor * 1.7;
    } else if (d === 'L') px -= 325 - scalingFactor;
    
    if (portion === 'L') {
        if (d === 'R') px += 325 - scalingFactor * 1.7;
    } else if (d === 'R') px += 325 - scalingFactor;
    
    py += 120;
    dx = px;
    dy = py;

    //to handle overriding of node in display 
    if (portion === 'L') {
        if (d === 'R') {
            if (dx < movepx || dx > root.x) {
                console.log("problem in left portion, for" + node.data);
                dx = movepx + 25;
            }
        }
    }
    if (portion === 'R') {
        if (d === 'L') {
            if (dx > movepx || dx < root.x) {
                console.log("problem in right portion, for" + node.data);
                dx = movepx - 25;
            }
        }
    }
    function moveNode() {
        // if(start > 70){
        // console.log(start);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // }
        // start++;
        node.update();
        node.draw(ctx);
        // console.log("animate");
        if (stopx === false || stopy === false)
            requestAnimationFrame(moveNode);

        stopx = false;
        stopy = false;
    }
    moveNode();
}