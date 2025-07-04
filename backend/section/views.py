from django.shortcuts import render
from rest_framework import generics
from .serializers import SectionSerializer
from .models import Section

# Create your views here.
class SectionView(generics.ListCreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
