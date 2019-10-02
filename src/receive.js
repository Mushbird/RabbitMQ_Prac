#!/user/bin/env node
// receive (받는 입장)

// require(libaray 요청)
var amqp = require('amqplib/callback_api');

// connect to RabbitMQ server (RabbitMQ 서버 접속)
// create a channel and most of the API for getting things done resides(채널생성)
// Note this matches up with the queue that sendToQueue (sendToQueue를 통해 보낸 큐를 매치업))
amqp.connect('amqp://localhost', function(error0, connection) {
    if(error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }
        var queue = '안녕'

        channel.assertQueue(queue, {
            durable : false
        });

        // tell the server to deliver us the messages from the queue. (서버에 메시지 전달요청)
        // provide a callback that will be executed when RabbitMQ pushes messages to our consumer (RabbitMQ가 메시지를 우리에게 줄때 콜백!)
        console.log(" [Mushbird] %s 이란 메시지를 기다리고 있어용~! 나가려면 CTRL+C를 눌러주세요. ", queue);
        channel.consume(queue, function(msg) {
            console.log(" [Mushbird] %s에게서 보낸 메시지를 받음", msg.content.toString());
        }, {
            noAck : true
        });
    });
});
