function pointer(RowN, TN, nN){
   if(TN==null){return document.getElementById("tableRow"+RowN)};
   if(nN==null){return document.getElementById("tableRow"+RowN).querySelectorAll(".t"+TN)};
   return (document.getElementById("tableRow"+RowN).querySelectorAll(".t"+TN))[0].querySelectorAll(".n"+nN);
}

function squre(row,t){
    var k="";
    var s="";
    document.getElementById("tableRow"+row).querySelectorAll(".t"+t)[0].dataset.psb = "";
    for(h=1;h<10;h++){
    	var z = pointer(row,t,h);
        if(z[0].innerHTML>0){s = s.concat(z[0].innerHTML);}
    }

    for(p=1;p<10;p++){ if(s.indexOf(p)<0){k=k.concat(p);}}
    document.getElementById("tableRow"+row).querySelectorAll(".t"+t)[0].dataset.psb = k;
    return k	
    
}
function rowCounter(row,t,n){
  var t = 1;
  if(n>0&&n<4){n = 1}
  if(n>3&&n<7){n = 4}
  if(n>6&&n<10){n = 7}
  var k = n;
  var m = 0;
  var a = [];
  while(m<9){
  	var x = pointer(row,t,n);
  	//console.log("rrr "+row+"."+t+"."+n)
  
  ////	console.log(x)
    var g = (pointer(row,t,n))[0].innerHTML;
    if(g>0){a.push(g);};   
    if(n-k==2){t = t+1;n = k;}
    else{n = n+1;}
    m++;
  }
  a.sort(function(a, b){return b - a});
  return a;
}
function lineCounter(row,t,n){
  
  if(n%3==0){n=3}
  else{n = (n+3)%3;}	
  var row = 1
  var k = n;
  var a = [];
  var m = 0;
  while(m<9){
  	var x = pointer(row,t,n);
  	//console.log("hhhh "+row+"."+t+"."+n)
  
  //	console.log(x)

    var g = x[0].innerHTML;
    if(g>0){a.push(g);}; 
   // console.log(n)
    if(n-k==6){row = row+1;n = k;}  
    else{n = n+3;}
    //	console.log(n)
    m++;  
  }
  a.sort(function(a, b){return b - a});
  return a;
}

//sets point psb as posibal number for point
function onApoint(row,t,n){
 // var a = checkLine(row,t,n);
  //var b = checkRow(row,t,n);
  
  var a = lineCounter(row,t,n);
  var b = rowCounter(row,t,n);
  //var s = (document.getElementById("tableRow"+row).querySelectorAll(".t"+t))[0].dataset.psb;
  var s = squre(row,t)
  for(var i = 0; i<s.length ; i++){
     var founda = a.find(function(element) {
          return element == s.slice(i, i+1);
     });
     var foundb = b.find(function(element) {
          return element == s.slice(i, i+1); 
     });
     
     if(founda>0 || foundb>0){}
      else{pointer(row,t,n)[0].dataset.psb=(pointer(row,t,n)[0].dataset.psb).concat(s.slice(i, i+1))}
      }
}

function Next(r,t,n){
	if(n%3==0){
		if(t<3){t++;n=n-2}
		else{
			t=1;
			if(n==9){r++;n=1}
			else{n++}
		}	
	}
	else{n++}	
	return r+""+t+""+n;	
}

function Back(r,t,n){
	
	if((n+3)%3==1){
		if(t>1){
			n=Number(n)+Number(2);
			t=t-1;
		}

		else{
			t=3;
			if(n==1){r=r-1;n=9}
			else{n=(Number(n)-Number(1));}
		}
	}
	else{n=Number(n)-Number(1)}
	return r+""+t+""+n;	
}

//need to push all new nums in lines and rows







function ffff(){
cons();
var b = false;	
var r = 1;
var t = 1;
var n = 1;
var z;
while(r<4){
	//debugger;

	var x = pointer(r,t,n)[0]
    
    switch(b){
    	case false:
            if(x.dataset.psb<0){
                z=Next(r,t,n);
                break
            }

            x.dataset.psb = "";
	        onApoint(r,t,n);
	        var psb = x.dataset.psb;
            if(psb>0){
		      var z=Next(r,t,n);
              x.innerHTML = psb.slice(0,1);
              x.dataset.psb = psb.slice(1,psb.length);
            }
            if(psb==""){
              z=Back(r,t,n);
              b = true;
            }
            break
    	case true:
    	    if(x.dataset.psb<0){
                z=Back(r,t,n);
                break
            }
            var psb = x.dataset.psb;
            if(psb==""){
              z=Back(r,t,n);
              x.innerHTML = ""
              break
            }
            else{
               x.innerHTML = psb.slice(0,1);
               x.dataset.psb = psb.slice(1,psb.length);	
               z=Next(r,t,n);
               b = false;
            }
            
    }

    r = z.slice(0,1)
    t = z.slice(1,2)
    n = z.slice(2,3)

}
return r
}






function cons(){
  
  for(var r = 1; r<4 ; r++){
     for(var t = 1; t<4 ; t++){
      for(var i=1;i<10;i++){
        var v = pointer(r,t,i)[0];
       if(v.innerHTML>0){v.dataset.psb=-1;}
      }
    }
  }
}












// var m=0;
// var u = [];
// for(e=1;e<4;e++){
//   var x = document.getElementById("tableRow"+e);
//   for(r=1;r<4;r++){
//     var y = x.querySelectorAll(".t"+r);
//     for(t=1;t<10;t++){
//       var z = y[0].querySelectorAll(".n"+t);
//       u.push(z[0]);
//      if(z[0].innerHTML!=""){
//         m++;
//       }
//     }
//   }
// }



// function checkRow(row,t,n){
//   var s = "";
//   if(n>0&&n<4){s="m"+row+"X"+1}
//   if(n>3&&n<7){s="m"+row+"X"+4}
//   if(n>6&&n<10){s="m"+row+"X"+7}
//   return eval(s);
// }
// function checkLine(row,t,n){
//   var s = "";
//   var b = (n+3)%3;
//   if(b == 0){b = 3;}
//   s = "X"+t+""+b;
//   return eval(s);
// }

// var X11 = lineCounter(1,1,1);
// var X12 = lineCounter(1,1,2);
// var X13 = lineCounter(1,1,3);
// var X21 = lineCounter(1,2,1);
// var X22 = lineCounter(1,2,2);
// var X23 = lineCounter(1,2,3);
// var X31 = lineCounter(1,3,1);
// var X32 = lineCounter(1,3,2);
// var X33 = lineCounter(1,3,3);

// var m1X1 = rowCounter(1,1,1);
// var m1X4 = rowCounter(1,1,4);
// var m1X7 = rowCounter(1,1,7);
// var m2X1 = rowCounter(2,1,1);
// var m2X4 = rowCounter(2,1,4);
// var m2X7 = rowCounter(2,1,7);
// var m3X1 = rowCounter(3,1,1);
// var m3X4 = rowCounter(3,1,4);
// var m3X7 = rowCounter(3,1,7);





// function smallPSB(){
//   var c = 11;
//   var f;
//   for(var r = 1; r<4 ; r++){
//      for(var t = 1; t<4 ; t++){
//       for(var i=1;i<10;i++){
//         var v = pointer(r,t,i)[0];
//        if(v.dataset.psb.length<c&&v.dataset.psb>0){c=v.dataset.psb.length;f=v;}
//       }
//     }
//   } return f;      
// }
// function uniq(row,t){
//   var g = 0;
//   for(var i = 1; i<10; i++){
//     var m = 0;
//     var k =0;
//     var n = 1;
//      var s = (document.getElementById("tableRow"+row).querySelectorAll(".t"+t))[0].dataset.psb; 
//             while(m<=1 && n<10){
//                 var l = pointer(row,t,n)[0].dataset.psb.indexOf(i);
//                 if(l>=0){m++;k=n;var v=l;}
//                 n++;
//             }
   
//     if(m==1){
//       pointer(row,t,k)[0].innerHTML = i ;
//       pointer(row,t,k)[0].dataset.psb=""
//       checkLine(row,t,k).push(i);
//       checkRow(row,t,k).push(i);
//       g++;
//       //checkLine(row,t,k).sort(function(a, b){return b - a});
//       //checkRow(row,t,k).sort(function(a, b){return b - a});
//      // s=s.slice(0,l)+s.slice(l+1,s.length);

//       //(document.getElementById("tableRow"+row).querySelectorAll(".t"+t))[0].dataset.psb =s;
//     }
//   }
//   return g;
// }

// function DaGame(l){
//  var g = 0; 
//  var m = l;   
//    for(var r = 1; r<4 ; r++){
//      for(var t = 1; t<4 ; t++){
//       for(var i=1;i<10;i++){
//        if(pointer(r,t,i)[0].innerHTML==""){
//           pointer(r,t,i)[0].dataset.psb="";
//           onApoint(r,t,i);
//        }
//        else{m++};
//      }
//      g = g+uniq(r,t);
//      }
//    } 
//    if(m==81){return 10}
//    //if(){return -1} 
//    if(g==0){
//      var f = smallPSB();
//      var i = 0;
//      f.innerHTML = f.dataset.psb.slice(i,i+1);
//    } 
//    DaGame(m);

// }
// function checkDaGame(r,t){
//      for(var r = 1; r<4 ; r++){
//      for(var t = 1; t<4 ; t++){
//       for(var i=1;i<10;i++){
//        if(pointer(r,t,i)[0].innerHTML==""){
//           pointer(r,t,i)[0].dataset.psb="";
//           onApoint(r,t,i);
//        }
//       } 
//      }
//      }
    
// }

// function lll(){
// var o = 0;	
// var r = 1;
// var t = 1;
// var n = 1;
// var m = 0
// while(r<4){
// 	var q = 0;
// 	debugger;
// //	m++;
// 	//console.log(m)
// 	//var p = rowCounter(r,t,n);
//       //   var p = lineCounter(r,t,n);
// 	var x = pointer(r,t,n)

//     if(x[0].innerHTML>0 && o==0){var z=Next(r,t,n);}
// 	if(x[0].innerHTML=="" && o==0){//no num
// 		x[0].dataset.psb = "";
// 	    onApoint(r,t,n);
// 	    var psb = x[0].dataset.psb;
// 	  if(psb>0){
// 		 var z=Next(r,t,n);
//         //put psb first in text
//          o = 0;
//          x[0].innerHTML = psb.slice(0,1);
//          x[0].dataset.psb = psb.slice(1,psb.length);
         
// 	  }
// 	  else{//no psb - mistake
// 	  	  var z = Back(r,t,n);
//           o = 1;
//           q = 1;
//           x[0].innerHTML=""
// 	  }
// 	}
// 	if(o==1 && q==0){
//     	if(x[0].dataset.psb < 1){
//     		var z = Back(r,t,n);
//             x[0].innerHTML="";
//     	}
//     	else{
//     		var psb = x[0].dataset.psb;
//     		x[0].innerHTML = psb.slice(0,1);
//             x[0].dataset.psb = psb.slice(1,psb.length);
//             var z=Next(r,t,n);
//     	}
//     }
//     r = z.slice(0,1)
//     t = z.slice(1,2)
//     n = z.slice(2,3)

// }
// return r
// }

