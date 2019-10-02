#!/usr/bin/env node
// sending (보내는 입장)

// require(libarary 요청)
var amqp = require('amqplib/callback_api');

// connect to RabbitMQ server (RabbitMQ 서버 접속)
// create a channel and most of the API for getting things done resides(채널생성)
amqp.connect('amqp://localhost', function(error0, connection) {
    if(error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }
        // publish a message to queue(메세지를 큐로 보내기 위해 변수에 담음)
        var queue = '안녕';
        var msg = 'bird';
        
        // Declaring a queue is idempotent (큐선언(유휴상태)))
        channel.assertQueue(queue, {
            durable:false
        });

        // send a message to queue(메세지 보내기(큐))
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [Mushbird] %s에게 메시지를 보냈어용~! ", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
