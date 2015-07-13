	// //构造函数
	function Slider(opts){
		//构造函数需要的参数
		this.outer = opts.dom;
		this.obj=opts.obj;
		//构造三步奏
		this.init();
		this.renderDOM();
		this.bindDOM();

		// 初始化目标元素色彩
		this.red=255;
		this.green=255;
		this.blue=255
	}

	// //第一步 -- 初始化
	Slider.prototype.init = function() {
		
		//获取目标元素距离左侧边界的距离
		this.left=this.outer.offsetLeft;
		this.width=this.outer.offsetWidth;
	};

	// 第二步创造dom
	Slider.prototype.renderDOM=function(){
		for (var i = 0; i < 3; i++) {
			var li=document.createElement('li');
			var span=document.createElement('span');

			switch(i){
				case 0:
				  span.style.cssText='width:60px;height:60px;border-radius:50%;background-color:rgb(255,0,0)';
				  break;
				case 1:
				  span.style.cssText='width:60px;height:60px;border-radius:50%;background-color:rgb(0,255,0)';
				  break;	
				case 2:
				  span.style.cssText='width:60px;height:60px;border-radius:50%;background-color:rgb(0,0,255)';
				  break;				  			  
			}
			
			li.appendChild(span);
		    this.outer.appendChild(li);
		};
		
	}

    // 第三步绑定事件
	Slider.prototype.bindDOM = function(){
	    var self=this;
	    var spans=self.outer.getElementsByTagName('span');

	    // 手指开始
		var starthalder=function(evt){
			// 事件对象
			var target = evt.target;
			while(target.nodeName != 'SPAN' && target.nodeName != 'BODY'){
				target = target.parentNode;
			}
			self.target = target;

		}
        
        //移动
		var movehalder=function(evt){
			evt.preventDefault();

			// 获取目标索引
			self.index=Array.prototype.slice.call(self.outer.childNodes).indexOf(evt.target.parentNode);
            
            // 滑块偏移距离
			self.offset=evt.targetTouches[0].pageX-self.left;

            console.log(self.index);
			

			if(self.offset<=0){
				self.style.webkitTransform = 'translate3d(0, 0, 0)';

			}else if(self.offset>=self.width){
				self.style.webkitTransform = 'translate3d('+ self.width +'px, 0, 0)';

			}else{
			 	evt.target.style.webkitTransform = 'translate3d('+ self.offset +'px, 0, 0)';
				// self.green=parseInt((self.offset/self.width)*255);
			}

            
            switch(self.index){
				case 1:
				   self.red=parseInt((self.offset/self.width)*255);
				   break;
				case 2:
                   self.green=parseInt((self.offset/self.width)*255);
                   break;
                case 3:
                   self.blue=parseInt((self.offset/self.width)*255);
                   break;                   
				  
			}
			

			// 给目标上色
			self.obj.style.backgroundColor='rgb('+self.red+','+self.green+','+self.blue+')';
             
            

		}
		//手指抬起
		var endhalder=function(evt){
			// obj.style.webkitTransform='translate('+evt.targetTouches[0].pageX-this.left+'px,0)';
			evt.preventDefault();
			// console.log(evt.targetTouches);

		}

        //先尝试循环绑定
        
        for (var i = 0; i < spans.length; i++) {
        	spans[i].addEventListener('touchstart', starthalder);
		    spans[i].addEventListener('touchmove', movehalder);
		    spans[i].addEventListener('touchend', endhalder);
        };

	}

   