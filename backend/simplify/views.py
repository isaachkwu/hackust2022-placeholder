from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
import trafilatura
from transformers import pipeline

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
      # print("------------------------------------------------1")
      pipe = pipeline("summarization", model="google/pegasus-xsum")
      # print("------------------------------------------------2")
      if not text:
        downloaded = trafilatura.fetch_url(url)
        main_text = trafilatura.extract(downloaded, include_comments=False, include_tables=False)
        simplified_text = pipe(main_text, max_length=512, clean_up_tokenization_spaces=True)
        # TODO: run model with main_text as input
        # simplified_text = ''
        return Response({
          'textContent': main_text, 
          'simplifiedText': simplified_text
          }, status=status.HTTP_200_OK)
      else:
        # print("------------------------------------------------3")
        simplified_text = pipe(text, max_length=512, clean_up_tokenization_spaces=True)
        # print("------------------------------------------------4")
        # TODO: run model with text as input
        # simplified_text = model(text)
        return Response({
          'textContent': text,
          'simplifiedText': simplified_text
          }, status=status.HTTP_200_OK)