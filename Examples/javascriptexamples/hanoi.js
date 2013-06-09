      // shadow datastructure that keeps track of blocks on pods
      // value 5 is used to represent base of the pod
      var pods=[[1,2,3,4,5],[0,0,0,0,5],[0,0,0,0,5]];

      // shadow datastructure that keeps track of the top row of each
      // pod that actually has a block
      var topRow=[0,4,4];

      var limbo = 0;
 
      function moveSlice(col) {
        var l = document.getElementById("limbo");

        if (!limbo) {   // picking slice
          if(topRow[col]<4) {
            var block = document.getElementById("c" + col + topRow[col]);
            l.src = block.src;
            l.width = block.width;
            block.src = "";
              
            limbo=pods[col][topRow[col]];
            pods[col][topRow[col]]=0;  
            topRow[col]++;
         }
        }
        else {  // droping slice
          if(limbo > pods[col][topRow[col]]) {
		    alert("Invalid Move!"); 
          }
          else {
            topRow[col]--;
            pods[col][topRow[col]]=limbo;
            var block = document.getElementById("c" + col + topRow[col]);
            block.src = l.src;
            block.width = l.width;
            l.src = "";
            limbo=0;
          }
        }
      }  
  