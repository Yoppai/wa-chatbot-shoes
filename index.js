const wa = require('@open-wa/wa-automate');
var products = require('./products');

wa.create().then(client => start(client));
 
function start(client) {
  client.onMessage(async message => {
    var palabraClave = 'catalogo'
    var position = message.body.toLowerCase().indexOf(palabraClave)
    var palabraClave1 = 'catálogo'
    var position1 = message.body.toLowerCase().indexOf(palabraClave1)
    if (position !== -1 || position1 !== -1 ){
        for(var product of products){
            var model = 'Modelo: '+ product.model
            var price = 'Precio: '+ product.price
            var primayoreo = 'Precio Mayoreo: '+ product.primayoreo
            var colors = 'Colores Disponibles:\n'
            for(var color of product.colors){
                colors += color += '\n'
            }
            await client.sendText(message.from, model+'\n'+colors+price+'\n'+primayoreo);
            for(var img of product.img){
                var path = './uploads/'+product.model+'/'+img
                await client.sendImage(message.from, path);
            }
        }

      
    }
  });
}
 



