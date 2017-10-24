<html>

<head>
  <title>Messenger</title>
</head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="jquery.min.js"></script>
<script src="socket.io.js"></script>
<script src="bootstrap.min.js"></script>
<style>
#text-container{
  position: fixed;
  right:0;
  bottom: 0;
  width:798px
    }
#message-container{
  position:fixed;
  top:10;
  right:20%;
  word-wrap:break-word;
}
#container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 800;
    transform: translateX(-50%) translateY(-50%);
}
#history {
    overflow: scroll;
    /*overflow: hidden;*/
}
#chat-name
{
  position:fixed;
  top:20;
  left:20%;
  font-size: 200%;
}
</style>
<body>
  <div id="message-container">
    <!-- <p id="chat-name"><span class="label label-info">CHAT APP</span></p> -->
    <a href="index.html" class="btn btn-info btn-lg">
    <span class="glyphicon glyphicon-log-out"></span>Logout
    </a>
  </div>
  <div id="container" class="panel panel-primary" style="max-width: 800">
  <div id="status" class="panel-heading" style="max-height: 50"></div>
  <div id="history" class="panel-body" style="height: 500px;">
  <div id="text-container" class="input-group">
  <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
  <input type="text" id="message" name="message" class="form-control" placeholder="Type Your Message">
  <span class="input-group-btn">
  <input type="button" name="sendMsg" class="btn btn-sucess" value="Send" onclick="sendMessage()">
  </span>
  </div>
  </div>
  </div>
  </body>
<script src="login.js"></script>
<script src="signup.js"></script>
<script src="message.js"></script>

</html>
