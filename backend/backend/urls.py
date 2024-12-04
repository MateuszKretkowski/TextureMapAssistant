"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from textureMapAssistant.views import get_texture_bits, color_duplicate_picker, simple_color_paint

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/get_texture_bits/', get_texture_bits, name='get_texture_bits'),
    path('api/color_duplicate_picker/', color_duplicate_picker, name='color_duplicate_picker'),
    path('api/simple_color_paint/', simple_color_paint, name='simple_color_paint'),
]
