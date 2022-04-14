from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from multiselectfield import MultiSelectField


PART_OF_SPEECH = ['noun', 'verb', 'adjective', 'adverb', 'phrase', 'conjunction', 'preposition', 'pronoun', 'interjection']
PART_OF_SPEECH_CHOICE = [(item, item) for item in PART_OF_SPEECH]

class Word(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  word = models.CharField(max_length=100)
  part_of_speech = MultiSelectField(choices=PART_OF_SPEECH_CHOICE)
  correct = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  wrong = models.IntegerField(default=0, validators=[MinValueValidator(0)])
  note = models.TextField(blank=True)
  my_sentence = models.CharField(max_length=255, blank=True)
  owner = models.ForeignKey('auth.User', related_name='words', on_delete=models.CASCADE)

  def isMastered(self):
    return self.correct >= 3 and self.correct / (self.wrong + self.correct) >= 0.75

  class Meta:
    ordering = ['created']
