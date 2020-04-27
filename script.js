document.addEventListener("DOMContentLoaded", function() {
    const svg = document.getElementById('plane');
    const lftPad = document.getElementById('leftPaddle');
    const rtPad = document.getElementById('rightPaddle');
    const circ = document.getElementById('circle1');
    
    
    let circle = {
        
        x:Number(circ.getAttribute('cx')),
        y:Number(circ.getAttribute('cy')),
        
        vX:1,
        vY:1,

        goesUp:false,
        goesLeft:false,

        move: function() {
            console.log('1');
            if(this.goesUp === true) {
                this.y -= 10;
            } else if(this.goesUp === false) {
                this.y += 10;
            }
            
            
            if(this.goesLeft === true) {
                this.x -= 5;
            } else if(this.goesLeft === false) {
                this.x += 5;
            }

            if(this.goesUp === true && this.y <= 0) {
                this.goesUp = false;
            } else if(this.goesUp === false && this.y >= parseInt(svg.getAttribute('height'))) {
                this.goesUp = true;
            //add CD against paddle    
            } else if(this.goesLeft === true && this.x <= 0) {
                this.goesLeft = false;
            } else if(this.goesLeft === false && this.x >= parseInt(svg.getAttribute('width'))) {
                this.goesLeft = true;
            }
            circ.setAttribute('cy', this.y);
            circ.setAttribute('cx', this.x);
        },

        onPaddle: function() {
            if(paddle.lftY <= this.y && paddle.lftY+100 >= this.y) {
                return true;
            } else if(paddle.rtY <= this.y && paddle.rtY+100 >= this.y) {
                return true;
            }
        }
    }
    //paddle object
    let paddle = {
        
        lftY:Number(lftPad.getAttribute('y')),
        rtY:Number(rtPad.getAttribute('y')),

        action: function(e) {
            
            if(e.code === 'ArrowUp' && circle.goesLeft === false) {
                paddle.rtY -= 5;
                rtPad.setAttribute('y', paddle.rtY);

            } else if(e.code === 'ArrowDown' && circle.goesLeft === false) {
                paddle.rtY += 5;
                rtPad.setAttribute('y', paddle.rtY);

            } else if(e.code === 'ArrowUp' && circle.goesLeft === true) {
                paddle.lftY -= 5;
                lftPad.setAttribute('y', paddle.lftY);

            } else if(e.code === 'ArrowDown' && circle.goesLeft === true) {
                paddle.lftY += 5;
                lftPad.setAttribute('y', paddle.lftY);   
            }
        }
    }
    
    document.addEventListener('keydown', paddle.action);
    setInterval(()=>circle.move(), 100);
});