let a,b;
let col;
let iter_num=1000;
let posa;
let posb;
let x,y;
let button;

function setup(){
    createCanvas(1200, 800);
    pixelDensity(1);
    button=createButton("ZOOM");
    button.mousePressed(create);
}

function draw(){
    background(0);
    posa=createVector(-2,1);
    posb=createVector(1,-1);
    x=posa;
    y=posb;
    console.time("a");
    let v=createVector(0,0)
    let w=createVector(width,height)
    draw_mandelbrot(v,w,posa,posb);
    console.timeEnd('a');
    noLoop()


    // if(a && b){
    //     stroke(255);
    //     noFill();
    //     rectMode(CORNERS)
    //     rect(a.x,a.y,b.x,b.y);
    // }
}


function mousePressed(){
    if(mouseX<width && mouseY<height){
        posa=createVector(mouseX,mouseY);
        console.log(posa,x);
    }
    
}


function mouseReleased(){
    if(mouseY<height && mouseX<width){
        posb=createVector(mouseX,mouseY);
        console.log(posb,y);

        rectMode(CORNERS);
        stroke(0,255,0,200)
        noFill()
        rect(posa.x,posa.y,posb.x,posb.y)
    }
    
}

function create(){
    draw_mandelbrot(posa,posb,x,y)
    
    var qx=map(posa.x,0,width,x.x,y.x)
    var px=map(posa.y,0,height,x.y,y.y);
    var qy=map(posb.x,0,width,x.x,y.x)
    var py=map(posb.y,0,height,x.y,y.y);
    x=createVector(qx,px);
    y=createVector(qy,py);
}

function draw_mandelbrot(pa,pb,prev_a,prev_b){
    loadPixels();
    for(let i=0;i<width;i++){
        for(let j=0;j<height;j++){

            let x1=map(pa.x,0,width,prev_a.x,prev_b.x);
            let x2=map(pb.x,0,width,prev_a.x,prev_b.x);
            let y1=map(pa.y,0,height,prev_a.y,prev_b.y);
            let y2=map(pb.y,0,height,prev_a.y,prev_b.y);

            let c_real=map(i,0,width,x1,x2);
            let c_img=map(j,0,height,y1,y2);

            let Z_real=c_real;
            let Z_img=c_img;

            for(let n=0;n<iter_num;n++){
                let temp_real=(Z_real*Z_real-Z_img*Z_img);
                let temp_img=(2*Z_real*Z_img);

                Z_real=temp_real+c_real;
                Z_img=temp_img+c_img;
            }
            
            

            if(abs(Z_real+Z_img)<16){
                col=255;
            }
            else{
                col=0;
            }


            index=(i+(j*width))*4;
            pixels[index]=col;
            pixels[index+1]=col;
            pixels[index+2]=col;
            pixels[index+3]=255;
        }
    }
    updatePixels();

}