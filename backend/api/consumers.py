from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

class NotificationConsumer(WebsocketConsumer):
    game_group_string = 'game_{}'

    def make_group_name(self, game_id):
        return  self.game_group_string.format(game_id)

    def connect(self):

        games_as_black = self.scope['user'].b_player_set.filter(winner__isnull=True)
        games_as_white = self.scope['user'].w_player_set.filter(winner__isnull=True)

        game_list = [game.id for game in games_as_white]
        game_list.extend([game.id for game in games_as_black])
        print(game_list)

        self.game_list = game_list

        self.notifier_group = "notifier"
        async_to_sync(self.channel_layer.group_add)(
            self.notifier_group,
            self.channel_name
        )
        for gn in self.game_list:
            group_name = self.make_group_name(gn)

            async_to_sync(self.channel_layer.group_add)(
                group_name,
                self.channel_name
            )

        self.accept()
        self.send(text_data=json.dumps({
            'type': 'chat.message',
            'message': "hello from the server"}))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
                self.notifier_group, 
                self.channel_name)

        for gn in self.game_list:
            group_name = self.make_group_name(gn)

            async_to_sync(self.channel_layer.group_add)(
                group_name,
                self.channel_name
            )

    def receive(self, text_data):
        print(text_data)
        text_data_json = json.loads(text_data)

        message = text_data_json['message']
        game_id = text_data_json['game_id']

        group_name = self.make_group_name(game_id)
        async_to_sync(self.channel_layer.group_send)(
            group_name,
            {
                'type': 'chat.message',
                'message': message,
            }
        )

    def notify_turn(self, event):
        # this name is used in the group to decide what to parse (type)
        print(event.keys())
        message = event['message']

        self.send(text_data=json.dumps({
            'type': 'notify.turn',
            'message': message,
        }))
