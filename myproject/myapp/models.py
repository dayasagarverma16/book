from django.db import models

class Book(models.Model):
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)   
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    published_date = models.DateField()

    def __str__(self):
        return self.title
