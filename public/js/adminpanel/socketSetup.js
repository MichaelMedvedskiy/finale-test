$(document).ready(function(){




socket.on('connect', function(){
  console.log('IM CONNECTED');

//  socket.emit('fillNewsEditor');

});

socket.on('actionSuccessful',function(message){
  generateConfirmMessage(message);
});

socket.on('newsSaveError',function(e){
  generateErrorMessage(e);
});



});
