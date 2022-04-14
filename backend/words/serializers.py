from numpy import source
from rest_framework import serializers, fields
from words.models import Word, PART_OF_SPEECH_CHOICE
from django.contrib.auth.models import User

class WordSerializer(serializers.ModelSerializer):
  owner = serializers.ReadOnlyField(source='owner.username')
  isMastered2 = serializers.CharField(source='isMastered', read_only=True)
  part_of_speech = fields.MultipleChoiceField(choices=PART_OF_SPEECH_CHOICE)
  class Meta:
    model = Word
    fields = ['url', 'id','isMastered2', 'owner', 'created', 'word', 'part_of_speech', 'correct', 'wrong', 'note', 'my_sentence']

  
# class UserSerializer(serializers.HyperlinkedModelSerializer):
#   words = serializers.HyperlinkedRelatedField(many=True, view_name='word-detail', read_only=True)

#   class Meta:
#     model = User
#     fields = ['url', 'id', 'username', 'words']