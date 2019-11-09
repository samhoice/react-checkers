from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

class NotificationConsumer(WebsocketConsumer):
    def connect(self):

        self.group_name = "notifier"
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()
        self.send(text_data=json.dumps({'message': "hello from the server"}))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.group_name, self.channel_name)

    def receive(self, text_data):
        print(text_data)
        text_data_json = json.loads(text_data)

        message = text_data_json['message']

        self.send(text_data=json.dumps({
            'message': message
        }))

    def notification(self, event):
        # this name is used in the group to decide what to parse (type)
        print(event.keys())
        message = event['data']

        self.send(text_data=json.dumps({
            'message': message
        }))
