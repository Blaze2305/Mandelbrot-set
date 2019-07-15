let v,w,a,b;
let iter_num=100;
let posa;
let posb;
let x,y;
let button;
let text_box;
let prev,reset;

function setup(){
    createCanvas(1200, 800);
    pixelDensity(1);
    button=createButton("ZOOM");
    button.mousePressed(create);
    text_box=createInput();
    text_box.input(change_iter);
    prev=createButton("PREVIOUS ZOOM");
    // prev.mousePressed(Pre);
    reset=createButton("BACK TO START")
    reset.mousePressed(refresh);
}

function draw(){
    background(0);
    posa=createVector(-2,1);
    posb=createVector(1,-1);
    x=posa;
    y=posb;
    console.time("a");
    v=createVector(0,0)
    w=createVector(width,height)
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

function change_iter(){
    iter_num=this.value();
}

function refresh(){
    draw_mandelbrot(v,w,posa,posb);
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
    let max=0;
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
            let num=0;
            for(let n=0;n<iter_num;n++){
                let temp_real=(Z_real*Z_real-Z_img*Z_img);
                let temp_img=(2*Z_real*Z_img);
                Z_real=temp_real+c_real;
                Z_img=temp_img+c_img;
                
                if(abs(Z_img +Z_real)>=2){
                    num=n;
                    break;
                }
                
            }
            
            let col=[];
            // let hue;
            // let sat=255;
            // let bright;

            // if(num<iter_num){
            //     bright=255;
            // }
            // else{
            //     bright=0;
            // }


            // hue=255*num/iter_num;
            // console.log(hue)
            let H1,S1,V1;
            H1=map(255*num/iter_num,0,255,0,360);
            S1=map(num,0,iter_num,0,1);
            V1=map(num,0,iter_num,0,1);
            let cols=HSB_to_RGB(H1,S1,V1);
            col=cols.map(x=> map(x,0,1,0,255))
            if(num>max){
                console.log(num);
                console.log("\n",col)
                max=num;  
            }



            // if(abs(Z_real+Z_img)<16){
                // col=255;
            // }
            // else{
                // col=0;
            // }

            // let col=map(num,0,iter_num,0,255);

            index=(i+(j*width))*4;
            pixels[index]=col[0];
            pixels[index+1]=col[1];
            pixels[index+2]=col[2];
            pixels[index+3]=255;
        }
    }
    updatePixels();

}




function HSB_to_RGB(H,S,V){
    let f,p,q,t;
    let cols=[];
    if(S==0){
        cols.push(V,V,V);
        return(cols);
    }
    else{
        H1=H/60;
        let i=floor(H1);
        f=H1-i;
        p=V*(1-S);
        q=V*(1-S*f);
        t=V*(1-S*(1-f));
        if(i==0){
            cols.push(V,t,p);
        }
        else if(i==1){
            cols.push(q,V,p);
        }
        else if (i==2){
            cols.push(p,V,t);
        }
        else if(i==3){
            cols.push(p,q,V);
        }
        else if (i==4){
            cols.push(t,p,V);
        }
        else{
            cols.push(V,p,q);
        }
        
        return(cols);
    }

}
