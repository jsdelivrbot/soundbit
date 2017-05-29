import sys
sys.path.append('/Users/connorgoggins/Library/Caches/pip/http')
import youtube_dl
import os
import sys


print "This is the name of the script: ", sys.argv[0]
print "Number of arguments: ", len(sys.argv)


class MyLogger(object):
    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)


def my_hook(d):
    if d['status'] == 'finished':
        print('Done downloading, now converting ...')


ydl_opts = {
    'format': 'bestaudio[ext=m4a]/best[ext=mp4]/best',
    'outtmpl': os.path.abspath("songs") + '/' + unicode(sys.argv[1] + ' - ' + sys.argv[2]) + '.%(ext)s',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
    'logger': MyLogger(),
    'progress_hooks': [my_hook],
}
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download([sys.argv[3]])

#https://www.youtube.com/watch?v=I5h8GfxIWVY
#unicode('blah')
