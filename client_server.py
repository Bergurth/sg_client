#!/usr/local/bin/python3.4
import cherrypy
import json
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
import re

import urllib
import urllib2
import cookielib
import requests
from BeautifulSoup import BeautifulSoup


#from localVars import db_port, db_host, openid_url_signin, openid_url_signup, openid_request_reset, openid_test_user



#query1 = db.users.find().count()




from bson import Binary, Code
from bson.json_util import dumps

import ast

def login_required(f):
    # a decorator factory providing a logged in check.
    def _login_required(*args, **kwargs):
        sess = cherrypy.session
        username = sess.get(SESSION_KEY, None)
        if (username != None):
            print "unae hittin"
            return f(*args, **kwargs)
        else:
            return "not logged in.   maaan!"

    return _login_required






"""
import cherrypy_cors
cherrypy_cors.install()
"""
def CORS():
    cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
    cherrypy.response.headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept"

cherrypy.tools.CORS = cherrypy.Tool('before_finalize', CORS)

# static served, login test
import os
cwd = os.getcwd()
path_client = os.path.abspath(os.path.dirname('/test_client/test_client_basic.html'))
stat_path = cwd + path_client
print stat_path

class Static(object):pass

class Supdate(object):pass




# session timeout should probably be longer.
config = {
    'global':{
        'server.socket_host': '127.0.0.1',
        'server.socket_port': 12314,
        'tools.CORS.on': True,
        # cherrypy_cors
        #'cors.expose.on': True,
    },
    '/':{
        #'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        'environment': 'production',
        'log.screen': False,
        'tools.sessions.on': True,
        'tools.sessions.persistent': True,
        'tools.sessions.timeout': 60,
        'tools.CORS.on': True,
        # cherrypy_cors
        #'cors.expose.on': True,

        #'tools.response_headers.on': True,
        #'tools.response_headers.headers': [('Content-Type', 'text/plain')],

        #'tools.staticdir.on': True,
        #'cors.expose.on' : True,

        #'tools.response_headers.on': True,
    },
}




cherrypy.config.update(config)

#cherrypy.tree.mount(Root(), '/', config=config)
#cherrypy.tree.mount(Auth(), '/auth', config=config)
#cherrypy.tree.mount(Protected(), '/protected', config=config)

cherrypy.tree.mount(Static(), '/static',config={'/': {
                'tools.staticdir.on': True,
                'tools.staticdir.dir': stat_path,
                'tools.staticdir.index': 'test_client_basic.html',
            },})

cherrypy.tree.mount(Supdate(), '/supdate',config={'/': {
                'tools.staticdir.on': True,
                'tools.staticdir.dir': stat_path,
                'tools.staticdir.index': 'updater.html',
            },})


cherrypy.engine.start()
cherrypy.engine.block()

#cherrypy.quickstart(Root())
