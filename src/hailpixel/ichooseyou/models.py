from django.db import models
from datetime import datetime

class Todo(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    due = models.DateField(blank = True, null = True)
    finished = models.DateTimeField(blank = True, null = True)
    
    task = models.CharField(max_length = 500)
    
    active = models.BooleanField(default = False)
    done = models.BooleanField(default = False)
    
    def __unicode__(self):
        return '(%s) %s' % (self.done and 'done' or 'not done', self.task)
        
    def completeTask(self):
        self.done = True
        self.finished = datetime.now()
    