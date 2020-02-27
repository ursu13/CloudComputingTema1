import cgi
from http.server import HTTPServer, CGIHTTPRequestHandler
from socketserver import ThreadingMixIn
import threading
import logging

logging.basicConfig(level=logging.DEBUG)

class TestServerHandler(CGIHTTPRequestHandler):

    def do_POST(self):
        if self.path == '/':
            self.path = './index.html'

        # try:
        form = cgi.FieldStorage(
                fp=self.rfile,
                # headers=self.headers,
                environ={
                    'REQUEST_METHOD': 'POST',
                    'CONTENT_TYPE': self.headers['Content-Type'],
                })
        firstname = form.getvalue('firstname')
        # lastname = form.getvalue('lastname')
        #     url = form.getvalue('url')
            # print(firstname + ' ' + lastname + ' ' + url)

        if str(firstname).isalnum():
            print(firstname)

            import TemaCloud
            TemaCloud.getImageByWord(str(firstname))
                # import time
                # time.sleep(3)

        # except:
        #     self.send_error(404, 'Bad request submitted.')
            # print("ceva")

class ThreadedHTTPServer(ThreadingMixIn,HTTPServer):
    """HANDLE REQUESTS IN DIFFERENT THREADS"""




if __name__ == "__main__":
    # test_server = HTTPServer(('localhost', 8080), TestServerHandler)
    test_server = ThreadedHTTPServer(('localhost', 8080), TestServerHandler)
    test_server.serve_forever()
