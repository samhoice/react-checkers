"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.contrib.auth import views as auth_views
from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'games', views.GameViewSet, basename='game')
router.register(r'board', views.BoardViewSet, basename='board')

authpatterns = [
        path(
            'login/',
            auth_views.LoginView.as_view(template_name='api/login.html'),
            name='login',
        ),
]

apipatterns = router.urls + [
]


urlpatterns = [
    path('checkers/', include([
        path('admin/', admin.site.urls),
        path('api/', include(apipatterns)),

        path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
        path('rest-auth/', include('rest_auth.urls')),

        path('accounts/', include(authpatterns)),
    ])),
]
