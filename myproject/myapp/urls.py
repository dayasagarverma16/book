from django.urls import path
from .views import BookList, BookDetail

urlpatterns = [
    path('books/', BookList.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetail.as_view(), name='book-detail'),
]


# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import BookViewSet
# from django.conf import settings
# from django.conf.urls.static import static

# # Create a router and register our viewset with it.
# router = DefaultRouter()
# router.register(r'books', BookViewSet, basename='book')

# # The API URLs are now determined automatically by the router.
# urlpatterns = [
#     path('', include(router.urls)),
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

