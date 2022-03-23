var xmlHttp;
function getRequestObject() 
{
  if ( window.ActiveXObject) 
  {
    return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
  }
  else if (window.XMLHttpRequest) 
  {
    return (new XMLHttpRequest());
  }
  else 
  {
    return (null);
  }
}

function send()
{
        var checkRadio = document.querySelector('input[name="season"]:checked');
        if(document.getElementById("Zima").checked)
        {
            document.getElementById("Zima").setAttribute('value', '1');
        }
        else if(document.getElementById("Wiosna").checked)
        {
            document.getElementById("Wiosna").setAttribute('value', '1');
        }
        else if(document.getElementById("Lato").checked)
        {
            document.getElementById("Lato").setAttribute('value', '1');
        }
        else if(document.getElementById("Jesien").checked)
        {
            document.getElementById("Jesien").setAttribute('value', '1');
        }
        var wynik = document.getElementById("Zima").value;
        wynik += "," + document.getElementById("Wiosna").value;
        wynik += "," + document.getElementById("Lato").value;
        wynik += "," + document.getElementById("Jesien").value + "\n";
        submit(wynik);
        document.getElementById("Wiosna").setAttribute('value', '0');
        document.getElementById("Lato").setAttribute('value', '0');
        document.getElementById("Jesien").setAttribute('value', '0');
        document.getElementById("Zima").setAttribute('value', '0');

    
}

function submit(text)
{
var xht = new XMLHttpRequest();
    xht.onreadystatechange = function() 
    {
        if(xht.readyState == 4 )
        {
            var data = xht.responseText;
        }
    }
    form = new FormData();
    form.append("dane", text);
    xht.open("POST", "../../cgi-bin/TI_2021/quiz_save.py",true);
    xht.send(form);
}

var array
var request;
function wynik() 
{
   fetch("../../cgi-bin/TI_2021/quiz_load.py")
    .then(response => 
        { 
            response.text().then( data => 
            {
              array = data.split(',');
              var arraydata = [0,0,0,0];
              for(var i = 0; i < 4; i++)
              {
                arraydata[i] =  Number(array[i])
              }
              
              var canvas = document.getElementById("canvas");
              var ctx = canvas.getContext("2d");
              var names = ['Zima','Wiosna', 'Lato', 'Jesien'];
              var canvasWidth = 400;
              var x_from = 40;
              var step = Math.round(canvasWidth / arraydata.length) - 5;
            
              for (var i = 0; i < arraydata.length; i++) 
              {
                var x_next = x_from + (i * step) - 20;
                ctx.fillStyle = "rgba(50, 150, 250, 1)";
                ctx.fillRect(x_next, 275, 40, -arraydata[i]*5);
                ctx.fillStyle = "rgba(10, 10, 50, 0.4)";
                ctx.fillRect(x_next, 275, 45, -arraydata[i]*5);
              }
          }) ;         
    })
    .catch(error => console.log("Błąd: ", error)); 
    
     
     
}

