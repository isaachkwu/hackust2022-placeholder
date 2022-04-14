from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
import trafilatura
from transformers import pipeline, AutoTokenizer

class SimplifyTextView(APIView):
  permission_classes = [AllowAny]

  def post(self, request, format=None):
    text = request.data.get('text', "")
    url = request.data.get('url', "")
    
    if not text and not url:
      return Response({"error": "text/url not found"}, status=status.HTTP_400_BAD_REQUEST)
    elif text and url:
      return Response({"error": "text/url both found"}, status=status.HTTP_400_BAD_REQUEST)
    # elif not text:
    else:
      print("------------------------------------------------1")
      pipe = pipeline("summarization", model="google/pegasus-xsum")
      model_ckpt = "distilbert-base-uncased"
      print("------------------------------------------------2")
      tokenizer = AutoTokenizer.from_pretrained(model_ckpt)
      print("------------------------------------------------3")
      if not text:
        print()
        downloaded = trafilatura.fetch_url(url)
        main_text = trafilatura.extract(downloaded, include_comments=False, include_tables=False)
        encoded_text = tokenizer(main_text)
        tokens = tokenizer.convert_ids_to_tokens(encoded_text.input_ids)
        if len(tokens) > 512:
          tokens = tokens[:450]
        main_text_cleared = tokenizer.convert_tokens_to_string(tokens)
        simplified_text = pipe(main_text_cleared[5:], max_length=512, clean_up_tokenization_spaces=True)
        # TODO: run model with main_text as input
        # simplified_text = ''
        return Response({
          'textContent': main_text, 
          'simplifiedText': simplified_text[0]["summary_text"]
          }, status=status.HTTP_200_OK)
      else:
        print("------------------------------------------------4")
        encoded_text = tokenizer(text)
        print("------------------------------------------------5")
        tokens = tokenizer.convert_ids_to_tokens(encoded_text.input_ids)
        print("------------------------------------------------6")
        if len(tokens) > 512:
          print("------------------------------------------------7")
          tokens = tokens[:450]
        print("------------------------------------------------8")
        text_cleared = tokenizer.convert_tokens_to_string(tokens)
        print("------------------------------------------------9")
        simplified_text = pipe(text_cleared[5:], max_length=512, clean_up_tokenization_spaces=True)
        print("------------------------------------------------10")
        # TODO: run model with text as input
        # simplified_text = model(text)
        return Response({
          'textContent': text,
          'simplifiedText': simplified_text[0]["summary_text"]
          }, status=status.HTTP_200_OK)