runes = [
  {
    name: "Thunderstorm",
    type: "energy",
    xMin: 1,
    yMin: 6,
    xMax: 2.6,
    yMax: 16,
    calculatedMinDamage: function(lvl, mlvl){
      return ((lvl*0.2) + (mlvl*this.xMin) + this.yMin);
    },
    calculatedMaxDamage: function(lvl, mlvl){
      return ((lvl*0.2) + (mlvl*this.xMax) + this.yMax);
    },
  },
  {
    name: "Stone Shower",
    type: "earth",
    xMin: 1,
    yMin: 6,
    xMax: 2.6,
    yMax: 16,
    calculatedMinDamage: function(lvl, mlvl){
      return ((lvl*0.2) + (mlvl*this.xMin) + this.yMin);
    },
    calculatedMaxDamage: function(lvl, mlvl){
      return ((lvl*0.2) + (mlvl*this.xMax) + this.yMax);
    },
  },
  {
    name: "GFB",
    type: "fire",
    xMin: 1.2,
    yMin: 7,
    xMax: 2.8,
    yMax: 17,
    calculatedMinDamage: function(lvl, mlvl){
      return ((lvl*0.2) + (mlvl*this.xMin) + this.yMin);
    },
    calculatedMaxDamage: function(lvl, mlvl){
      return ((lvl*0.2) + (mlvl*this.xMax) + this.yMax);
    },
  },
  {
    name: "Avalanche",
    type: "ice",
    xMin: 1.2,
    yMin: 7,
    xMax: 2.8,
    yMax: 17,
    calculatedMinDamage: function(lvl, mlvl){
      return ((lvl*0.2) + (mlvl*this.xMin) + this.yMin);
    },
    calculatedMaxDamage: function(lvl, mlvl){
      return ((lvl*0.2) + (mlvl*this.xMax) + this.yMax);
    },
  },
];

mobs=[];
mobsTest=[
  {
    name: "Burster Spectre",
    quantity: 1000,
    resists: [
      {
        type: "Fire",
        resist: 1.2
      },
      {
        type: "Death",
        resist: 1
      },
      {
        type: "Holy",
        resist: 1
      },
      {
        type: "Energy",
        resist: 1
      },
      {
        type: "Earth",
        resist: 1
      },
      {
        type: "Ice",
        resist: 0.3
      },
      {
        type: "Physical",
        resist: 0
      },
    ]
  },
  {
    name: "Arachnophobica",
    quantity: 900,
    resists: [
      {
        type: "Fire",
        resist: 1
      },
      {
        type: "Death",
        resist: 0.5
      },
      {
        type: "Holy",
        resist: 1.4
      },
      {
        type: "Energy",
        resist: 0.5
      },
      {
        type: "Earth",
        resist: 1
      },
      {
        type: "Ice",
        resist: 1
      },
      {
        type: "Physical",
        resist: 1
      },
    ]
  },
  {
    name: "Gazer Spectre",
    quantity: 430,
    resists: [
      {
        type: "Fire",
        resist: 0.3
      },
      {
        type: "Death",
        resist: 1
      },
      {
        type: "Holy",
        resist: 1
      },
      {
        type: "Energy",
        resist: 1
      },
      {
        type: "Earth",
        resist: 1
      },
      {
        type: "Ice",
        resist: 1.3
      },
      {
        type: "Physical",
        resist: 0.15
      },
    ]
  },
  {
    name: "Ripper Spectre",
    quantity: 91,
    resists: [
      {
        type: "Fire",
        resist: 1.2
      },
      {
        type: "Death",
        resist: 1
      },
      {
        type: "Holy",
        resist: 1
      },
      {
        type: "Energy",
        resist: 1.1
      },
      {
        type: "Earth",
        resist: 0.8
      },
      {
        type: "Ice",
        resist: 1
      },
      {
        type: "Physical",
        resist: 0.3
      },
    ]
  }
];

idCont = 0;
$(function() {
  $("#showResultsButton").click(function(){
    $('#resultado').modal('show');
  });
  
  $("#calcButton").click(function(){
    lvl = $("#lvlInput").val();
    mlvl = $("#mlvlInput").val();
    $("#lvlInput, #mlvlInput").removeClass("is-invalid");
    if(lvl == null || lvl.trim() == ""){
       $("#lvlInput").addClass("is-invalid");
    } else if (mlvl == null || mlvl.trim() == ""){
      $("#mlvlInput").addClass("is-invalid");
    } else {
      calcHuntDamage();
    }
  });

  $("#addButton").click(function(){
    mobName = $("#nameInput").val();
    mobQuantity = $("#quantityInput").val();
    $("#nameInput, #quantityInput").removeClass("is-invalid");
    if(mobName == null || mobName.trim() == ""){
       $("#nameInput").addClass("is-invalid");
    } else if (mobQuantity == null || mobQuantity.trim() == ""){
      $("#quantityInput").addClass("is-invalid");
    } else {
      idCont++;
      mobs.push({
        id: idCont,
        name: mobName,
        quantity: mobQuantity,
        resists: [
          {type: "fire", resist: formatResistance("#fireResistInput")},
          {type: "ice", resist: formatResistance("#iceResistInput")},
          {type: "energy", resist: formatResistance("#energyResistInput")},
          {type: "earth", resist: formatResistance("#earthResistInput")},
          {type: "death", resist: formatResistance("#deathResistInput")},
          {type: "holy", resist: formatResistance("#holyResistInput")},
          {type: "physical", resist: formatResistance("#physicalResistInput")},
        ],
        getNotDefaultResistances: function(){
             return this.resists.filter(resist => resist.resist != 1).sort((a, b) => {
               return a.resist + b.resist;
             });
         }
      });
      pintarMobs();
    }
  });
  
  
});


  function formatResistance(id){
    console.log($(id).val()/100 );
    return $(id).val() != null && $(id).val().trim() != "" && !isNaN($(id).val()) ? $(id).val()/100 : 1;
  }

  function pintarMobs(){
    console.log(mobs);
    $("#huntMobs").html("");
    mobs.forEach(mob=>{
      notDefaultResistances=mob.getNotDefaultResistances();
      htmlResistances = "";
      notDefaultResistances.forEach(e => {
        htmlResistances+= "<li>"+Math.round(e.resist*100)+"% "+e.type+"</li>"
      });
      $("#huntMobs").append('<div class="card border-primary col-md-3" style="max-width: 18rem;">'+
            '<div class="card-header">'+
              '<button type="button" class="btn btn-outline-danger right" onClick=deleteMob('+mob.id+')>X</button>'+
            '</div>'+
            '<div class="card-body text-primary">'+
              '<h5 class="card-title">'+mob.quantity+" "+mob.name+'</h5>'+
              '<p class="card-text"><span>Damage taken:</span><ul>'+htmlResistances+'</ul></p>'+
            '</div>'+
          '</div>');
    });
  }


  function deleteMob(idMob){
    mobs = mobs.filter(mob => mob.id != idMob);
    pintarMobs();
  }

  function calcHuntDamage(){
    $("#showResultsButton").show();
    $("#resultado .modal-body").html("");
    runes.forEach(rune=> {
      let minAux = Math.round(rune.calculatedMinDamage(lvl,mlvl));
      let maxAux = Math.round(rune.calculatedMaxDamage(lvl,mlvl));
      minHunt = 0;
      maxHunt = 0;

      if(mobs.length > 0){
        mobs.forEach(mob=>{
          minResistCalc = 0;
          maxResistCalc = 0;
          mob.resists.forEach(resist =>{
            if(rune.type == resist.type){
              minResistCalc= minAux * resist.resist;
              maxResistCalc= maxAux * resist.resist;

            }
          });

          minHunt+=minResistCalc*mob.quantity;
          maxHunt+=maxResistCalc*mob.quantity;
        });

        $("#resultado .modal-body").append("<div class='rune'>"+
                               "<span>Name: </span>"+rune.name+
                               "<br>"+
                               "<span>Type: </span>"+rune.type+
                               "<br>"+
                               "<span>Damage: </span>"+Math.round(minAux)+"-"+Math.round(maxAux)+
                               "<br>"+
                               "<span>Hunt damage: </span>"+ Math.round(minHunt)+"-"+Math.round(maxHunt)+
                               "<hr>"+
                               "</div");
          $('#resultado').modal('show');
        } else {
          $("#resultado .modal-body").append("<div class='rune'>"+
                               "<span>Name: </span>"+rune.name+
                               "<br>"+
                               "<span>Type: </span>"+rune.type+
                               "<br>"+
                               "<span>Damage: </span>"+Math.round(minAux)+"-"+Math.round(maxAux)+
                               "<hr></div");
          $('#resultado').modal('show');
        }
    });

    $('#resultado').modal();
  }
    

