Ext.define('TianZun.view.ContentCenter', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contentCenter',
    requires: [
        'TianZun.view.sys.BulletinBoardDetail',
        'TianZun.controller.ContentCenter',
    ],
    controller: 'contentCenter',
    initComponent: function () {
        var store = Ext.create('TianZun.store.BulletinBoard.SysLogListStore');
        var Infostore = Ext.create('TianZun.store.BulletinBoard.HomeBulletinBoardStore');
        var winwidth = document.body.clientWidth - 220;
        var winheight = document.documentElement.clientHeight;
        var bodypadding = winheight * 0.18 * 0.25 + " " + winheight * 0.18 * 0.3 + " 0 " + winheight * 0.18 * 0.5;
        var firstmargin = winheight * 0.1 * 0.2 + " " + winheight * 0.1 * 0.3 + " 0 " + winheight * 0.1 * 0.4;
        var secondMargin = winheight * 0.1 * 0.1 + " " + winheight * 0.1 * 0.3 + " 0 " + winheight * 0.1 * 0.4;
        var me = this;
        this.items = [{
            border: false,
            bodyPadding: bodypadding,
            layout: {
                type: 'table',
                columns: 3,
            },
            defaults: {
                margin: firstmargin,
            },
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    height: winheight * 0.18,
                    width: winwidth * 0.25,
                    bodyStyle: 'background: url(/Images/images/一般案件.png) no-repeat;background-size:100% 100%',
                    html: '<div style="font-family: 微软雅黑, 宋体 !important;font-size:20px;color:#fff;line-height:35px;text-align:center">一般案件</div>',
                    items: [
                        {
                            xtype: 'label',
                            name: 'CommonCase',
                            height: winheight * 0.18,
                            width: winwidth * 0.25 * 0.5,
                            style: 'position:absolute;top:' + winheight * 0.072 + 'px;left:' + winwidth * 0.25 * 0.5 * 0.7 + 'px;font-family: 微软雅黑, 宋体 !important;font-size:36px;font-weight:300;color:#fff;padding-left:80px;padding-top:10px;background:url(/Images/images/案件icon.png) no-repeat;',
                            listeners: {
                                beforerender: function (obj) {
                                    Ext.Ajax.request({
                                        url: 'api/CommonCase/GetCaseList?start=0&limit=20&userid=' + $.cookie('USER_ID') + '&status=1',
                                        method: 'get',
                                        //async: false,
                                        success: function (response) {
                                            jsonstr = Ext.decode(response.responseText);
                                            me.down("label[name=CommonCase]").setText(jsonstr.Total);
                                        }
                                    });
                                },
                                render: function () {
                                    //鼠标滑动效果
                                    Ext.fly(this.el).on('mouseover',
                                      function (e, t) {
                                          e.target.style.color = '#DCDCDC';
                                      });
                                    Ext.fly(this.el).on('mouseout',
                                      function (e, t) {
                                          e.target.style.color = '#fff';
                                      });
                                }
                            }
                        }
                    ],
                    listeners: {
                        render: function () {
                            //鼠标滑动效果
                            Ext.fly(this.el).on('mouseover',
                              function (e, t) {
                                  //e.target.style.color = '#DCDCDC';
                                  e.target.style.cursor = 'pointer';
                              });
                            //渲染后添加click事件
                            Ext.fly(this.el).on('click',
                              function (e, t) {
                                  Ext.Array.each(Ext.getCmp("IndexLeft").query('gridcolumn'), function (value, key) {
                                      if (value.up('panel').up('panel').title == '执法办案管理') {
                                          var content = Ext.create('TianZun.view.legalcasemanager.casemanager.CommonCaseList');
                                          var view = Ext.ComponentQuery.query('viewport')[0];
                                          var panel = view.items.getAt(3);
                                          var gridArr = value.up('treepanel').getEl().query('.x-grid-item');
                                          Ext.Array.each(gridArr, function (value1, key1) {
                                              if (value1.innerText == '一般案件')
                                                  value1.className = "x-grid-item x-grid-item-selected";
                                          })
                                          view.remove(panel)
                                          content.region = 'center';
                                          view.add(content);
                                      }
                                  })
                              });
                        }
                    },
                },
                {
                    xtype: 'panel',
                    border: false,
                    height: winheight * 0.18,
                    width: winwidth * 0.25,
                    bodyStyle: {
                        background: 'url(/Images/images/市民事件.png) no-repeat;background-size:100% 100%',
                    },
                    html: '<div style="font-family: 微软雅黑, 宋体 !important;font-size:20px;color:#fff;line-height:35px;text-align:center">市民事件</div>',
                    items: [
                        {
                            xtype: 'label',
                            name: 'Event',
                            height: winheight * 0.18,
                            width: winwidth * 0.25 * 0.5,
                            style: 'position:absolute;top:' + winheight * 0.18 * 0.4 + 'px;left:' + winwidth * 0.25 * 0.5 * 0.7 + 'px;font-family: 微软雅黑, 宋体 !important;font-size:36px;color:#fff;font-weight:300;padding-left:80px;padding-top:5px;background:url(/Images/images/事件icon.png) no-repeat;',
                            listeners: {
                                beforerender: function (obj) {
                                    Ext.Ajax.request({
                                        url: 'api/CitizenEvent/GetCitizenServicesList?start=0&limit=20&userid=' + $.cookie('USER_ID') + '&status=1',
                                        method: 'get',
                                        //async: false,
                                        success: function (response) {
                                            jsonstr = Ext.decode(response.responseText);
                                            me.down("label[name=Event]").setText(jsonstr.Total);
                                        }
                                    });
                                },
                                render: function () {
                                    //鼠标滑动效果
                                    Ext.fly(this.el).on('mouseover',
                                      function (e, t) {
                                          e.target.style.color = '#DCDCDC';
                                      });
                                    Ext.fly(this.el).on('mouseout',
                                      function (e, t) {
                                          e.target.style.color = '#fff';
                                      });
                                }
                            }
                        }
                    ],
                    listeners: {
                        render: function () {
                            //鼠标滑动效果
                            Ext.fly(this.el).on('mouseover',
                              function (e, t) {
                                  //e.target.style.color = '#DCDCDC';
                                  e.target.style.cursor = 'pointer';
                              });
                            //渲染后添加click事件
                            Ext.fly(this.el).on('click',
                              function (e, t) {
                                  Ext.Array.each(Ext.getCmp("IndexLeft").query('gridcolumn'), function (value, key) {
                                      if (value.up('panel').up('panel').title == '市民服务管理') {
                                          if (value.up('panel').up('panel').getEl().query('.x-tool')[0].getAttribute('data-qtip') == '展开')
                                              value.up('panel').up('panel').getEl().query('.x-panel-header')[0].click();
                                          var content = Ext.create('TianZun.view.citizenservice.citizenevent.EventList');
                                          var view = Ext.ComponentQuery.query('viewport')[0];
                                          var panel = view.items.getAt(3);
                                          var gridArr = value.up('treepanel').getEl().query('.x-grid-item');
                                          Ext.Array.each(gridArr, function (value1, key1) {
                                              if (value1.innerText == '市民事件')
                                                  value1.className = "x-grid-item x-grid-item-selected";
                                          });
                                          view.remove(panel)
                                          content.region = 'center';
                                          view.add(content);
                                      }
                                  })
                              });
                        }
                    },
                },
                {
                    xtype: 'panel',
                    border: false,
                    height: winheight * 0.18,
                    width: winwidth * 0.25,
                    bodyStyle: {
                        background: 'url(/Images/images/违停案件.png) no-repeat;background-size:100% 100%',
                    },
                    html: '<div style="font-family: 微软雅黑, 宋体 !important;font-size:20px;color:#fff;line-height:35px;text-align:center">违停案件</div>',
                    items: [
                        {
                            xtype: 'label',
                            name: 'IllegalCase',
                            height: winheight * 0.18,
                            width: winwidth * 0.25 * 0.5,
                            style: 'position:absolute;top:' + winheight * 0.18 * 0.4 + 'px;left:' + winwidth * 0.25 * 0.5 * 0.7 + 'px;font-family: 微软雅黑, 宋体 !important;font-size:36px;color:#fff;font-weight:300;padding-left:80px;padding-top:10px;background:url(/Images/images/违停icon.png) no-repeat;',
                            listeners: {
                                beforerender: function (obj) {
                                    Ext.Ajax.request({
                                        url: 'api/Violated/GetPendingCaseWtajsList?start=0&limit=20&processstatus=0',
                                        method: 'get',
                                        //async: false,
                                        success: function (response) {
                                            jsonstr = Ext.decode(response.responseText);
                                            me.down("label[name=IllegalCase]").setText(jsonstr.Total);
                                        }
                                    });
                                },
                                render: function () {
                                    //鼠标滑动效果
                                    Ext.fly(this.el).on('mouseover',
                                      function (e, t) {
                                          e.target.style.color = '#DCDCDC';
                                      });
                                    Ext.fly(this.el).on('mouseout',
                                      function (e, t) {
                                          e.target.style.color = '#fff';
                                      });
                                }
                            }
                        }
                    ],
                    listeners: {
                        render: function () {
                            //鼠标滑动效果
                            Ext.fly(this.el).on('mouseover',
                              function (e, t) {
                                  //e.target.style.color = '#DCDCDC';
                                  e.target.style.cursor = 'pointer';
                              });
                            //渲染后添加click事件
                            Ext.fly(this.el).on('click',
                              function (e, t) {
                                  Ext.Array.each(Ext.getCmp("IndexLeft").query('gridcolumn'), function (value, key) {
                                      if (value.up('panel').up('panel').title == '执法办案管理') {
                                          if (value.up('panel').up('panel').getEl().query('.x-tool')[0].getAttribute('data-qtip') == '展开')
                                              value.up('panel').up('panel').getEl().query('.x-panel-header')[0].click();
                                          var content = Ext.create('TianZun.view.legalcasemanager.casemanager.IllegalCaseList');
                                          var view = Ext.ComponentQuery.query('viewport')[0];
                                          var panel = view.items.getAt(3);
                                          var gridArr = value.up('treepanel').getEl().query('.x-grid-item');
                                          Ext.Array.each(gridArr, function (value1, key1) {
                                              if (value1.innerText == '违停案件')
                                                  value1.className = "x-grid-item x-grid-item-selected";
                                          })
                                          view.remove(panel)
                                          content.region = 'center';
                                          view.add(content);
                                      }
                                  })
                              });
                        }
                    },
                }
            ]
        },
                {
                    border: false,
                    bodyPadding: bodypadding,
                    layout: {
                        type: 'table',
                        columns: 3,
                    },
                    defaults: {
                        width: 280,
                        //margin: '10 30 10 40',
                        margin: secondMargin,
                        //margin: '0 20% 50% 100%',
                    },
                    items: [
                        {
                            xtype: 'panel',
                            height: winheight * 0.18,
                            width: winwidth * 0.25,
                            border: false,
                            bodyStyle: {
                                background: 'url(/Images/images/行政审批.png) no-repeat;background-size:100% 100%',
                            },
                            html: '<div style="font-family: 微软雅黑, 宋体 !important;font-size:20px;color:#fff;line-height:35px;text-align:center">行政审批</div>',
                            items: [
                               {
                                   xtype: 'label',
                                   name: 'License',
                                   height: winheight * 0.18,
                                   width: winwidth * 0.25 * 0.5,
                                   style: 'position:absolute;top:' + winheight * 0.18 * 0.4 + 'px;left:' + winwidth * 0.25 * 0.5 * 0.7 + 'px;font-family: 微软雅黑, 宋体 !important;font-size:36px;color:#fff;font-weight:300;padding-left:80px;padding-top:10px;background:url(/Images/images/行政审批icon.png) no-repeat',
                                   listeners: {
                                       beforerender: function (obj) {
                                           var isxzk = false;
                                           $.cookie('ROLE_IDS').indexOf(14) >= 0 ? isxzk = true : isxzk = false;
                                           Ext.Ajax.request({
                                               url: 'api/Approval/GetToBeApprovalList?start=0&limit=20&userid=' + $.cookie('USER_ID') + "&status=0&isxzk=" + isxzk,
                                               method: 'get',
                                               //async: false,
                                               success: function (response) {
                                                   jsonstr = Ext.decode(response.responseText);
                                                   me.down("label[name=License]").setText(jsonstr.Total);
                                               }
                                           });
                                       },
                                       render: function () {
                                           //鼠标滑动效果
                                           Ext.fly(this.el).on('mouseover',
                                             function (e, t) {
                                                 e.target.style.color = '#DCDCDC';
                                             });
                                           Ext.fly(this.el).on('mouseout',
                                             function (e, t) {
                                                 e.target.style.color = '#fff';
                                             });
                                       }
                                   }
                               }
                            ],
                            listeners: {
                                render: function () {
                                    //鼠标滑动效果
                                    Ext.fly(this.el).on('mouseover',
                                      function (e, t) {
                                          //e.target.style.color = '#DCDCDC';
                                          e.target.style.cursor = 'pointer';
                                      });
                                    //渲染后添加click事件
                                    Ext.fly(this.el).on('click',
                                      function (e, t) {
                                          Ext.Array.each(Ext.getCmp("IndexLeft").query('gridcolumn'), function (value, key) {
                                              if (value.up('panel').up('panel').title == '行政审批管理') {
                                                  if (value.up('panel').up('panel').getEl().query('.x-tool')[0].getAttribute('data-qtip') == '展开')
                                                      value.up('panel').up('panel').getEl().query('.x-panel-header')[0].click();
                                                  var content = Ext.create('TianZun.view.administrativeapproval.approval.ApprovalList');
                                                  var view = Ext.ComponentQuery.query('viewport')[0];
                                                  var panel = view.items.getAt(3);
                                                  var gridArr = value.up('treepanel').getEl().query('.x-grid-item');
                                                  Ext.Array.each(gridArr, function (value1, key1) {
                                                      if (value1.innerText == '行政审批')
                                                          value1.className = "x-grid-item x-grid-item-selected";
                                                  })
                                                  view.remove(panel)
                                                  content.region = 'center';
                                                  view.add(content);
                                              }
                                          })
                                      });
                                }
                            },
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            bodyStyle: {
                                background: 'url(/Images/images/养护任务.png) no-repeat;background-size:100% 100%',
                            },
                            html: '<div style="font-family: 微软雅黑, 宋体 !important;font-size:20px;color:#fff;line-height:35px;text-align:center">养护任务</div>',
                            height: winheight * 0.18,
                            width: winwidth * 0.25,
                            items: [
                               {
                                   xtype: 'label',
                                   name: 'conservationtask',
                                   height: winheight * 0.18,
                                   width: winwidth * 0.25 * 0.5,
                                   style: 'position:absolute;top:' + winheight * 0.18 * 0.4 + 'px;left:' + winwidth * 0.25 * 0.5 * 0.7 + 'px;font-family: 微软雅黑, 宋体 !important;font-size:36px;color:#fff;padding-left:80px;font-weight:300;padding-top:10px;background:url(/Images/images/养护icon.png) no-repeat;',
                                   listeners: {
                                       beforerender: function (obj) {
                                           Ext.Ajax.request({
                                               url: 'api/YhTask/GetYhtaskList?start=0&limit=20&userid=' + $.cookie('USER_ID') + '&status=1',
                                               method: 'get',
                                               //async: false,
                                               success: function (response) {
                                                   jsonstr = Ext.decode(response.responseText);
                                                   me.down("label[name=conservationtask]").setText(jsonstr.Total);
                                               }
                                           });
                                       },
                                       render: function () {
                                           //鼠标滑动效果
                                           Ext.fly(this.el).on('mouseover',
                                             function (e, t) {
                                                 e.target.style.color = '#DCDCDC';
                                             });
                                           Ext.fly(this.el).on('mouseout',
                                             function (e, t) {
                                                 e.target.style.color = '#fff';
                                             });
                                       }
                                   }
                               }
                            ],
                            listeners: {
                                render: function () {
                                    //鼠标滑动效果
                                    Ext.fly(this.el).on('mouseover',
                                      function (e, t) {
                                          //e.target.style.color = '#DCDCDC';
                                          e.target.style.cursor = 'pointer';
                                      });
                                    //渲染后添加click事件
                                    Ext.fly(this.el).on('click',
                                      function (e, t) {
                                          Ext.Array.each(Ext.getCmp("IndexLeft").query('gridcolumn'), function (value, key) {
                                              if (value.up('panel').up('panel').title == '市容养护管理') {
                                                  if (value.up('panel').up('panel').getEl().query('.x-tool')[0].getAttribute('data-qtip') == '展开')
                                                      value.up('panel').up('panel').getEl().query('.x-panel-header')[0].click();
                                                  var content = Ext.create('TianZun.view.conservation.conservationtask.TaskList');
                                                  var view = Ext.ComponentQuery.query('viewport')[0];
                                                  var panel = view.items.getAt(3);
                                                  var gridArr = value.up('treepanel').getEl().query('.x-grid-item');
                                                  Ext.Array.each(gridArr, function (value1, key1) {
                                                      if (value1.innerText == '养护任务管理')
                                                          value1.className = "x-grid-item x-grid-item-selected";
                                                  })
                                                  view.remove(panel)
                                                  content.region = 'center';
                                                  view.add(content);
                                              }
                                          })
                                      });
                                }
                            },
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            bodyStyle: {
                                background: 'url(/Images/images/专项整治.png) no-repeat;background-size:100% 100%;',
                            },
                            html: '<div style="font-family: 微软雅黑, 宋体 !important;font-size:20px;color:#fff;line-height:35px;text-align:center">专项整治</div>',
                            height: winheight * 0.18,
                            width: winwidth * 0.25,
                            items: [
                               {
                                   xtype: 'label',
                                   name: 'taskmanagement',
                                   height: winheight * 0.18,
                                   width: winwidth * 0.25 * 0.5,
                                   style: 'position:absolute;top:' + winheight * 0.18 * 0.4 + 'px;left:' + winwidth * 0.25 * 0.5 * 0.7 + 'px;font-family: 微软雅黑, 宋体 !important;font-size:36px;color:#fff;padding-left:80px;font-weight:300;padding-top:10px;background:url(/Images/images/专项整治icon.png) no-repeat;',
                                   listeners: {
                                       beforerender: function (obj) {
                                           Ext.Ajax.request({
                                               url: 'api/SpecialTask/GetSpecialTaskList?start=0&limit=20&userid=' + $.cookie('USER_ID'),
                                               method: 'get',
                                               //async: false,
                                               success: function (response) {
                                                   jsonstr = Ext.decode(response.responseText);
                                                   me.down("label[name=taskmanagement]").setText(jsonstr.Total);
                                               }
                                           });
                                       },
                                       render: function () {
                                           //鼠标滑动效果
                                           Ext.fly(this.el).on('mouseover',
                                             function (e, t) {
                                                 e.target.style.color = '#DCDCDC';
                                             });
                                           Ext.fly(this.el).on('mouseout',
                                             function (e, t) {
                                                 e.target.style.color = '#fff';
                                             });
                                       }
                                   }
                               }
                            ],
                            listeners: {
                                render: function () {
                                    //鼠标滑动效果
                                    Ext.fly(this.el).on('mouseover',
                                      function (e, t) {
                                          //e.target.style.color = '#DCDCDC';
                                          e.target.style.cursor = 'pointer';
                                      });
                                    //渲染后添加click事件
                                    Ext.fly(this.el).on('click',
                                      function (e, t) {
                                          Ext.Array.each(Ext.getCmp("IndexLeft").query('gridcolumn'), function (value, key) {
                                              if (value.up('panel').up('panel').title == '执法监管') {
                                                  if (value.up('panel').up('panel').getEl().query('.x-tool')[0].getAttribute('data-qtip') == '展开')
                                                      value.up('panel').up('panel').getEl().query('.x-panel-header')[0].click();
                                                  var content = Ext.create('TianZun.view.specialrectification.taskmanagement.TaskList');
                                                  var view = Ext.ComponentQuery.query('viewport')[0];
                                                  var panel = view.items.getAt(3);
                                                  var gridArr = value.up('treepanel').getEl().query('.x-grid-item');
                                                  Ext.Array.each(gridArr, function (value1, key1) {
                                                      if (value1.innerText == '任务管理')
                                                          value1.className = "x-grid-item x-grid-item-selected";
                                                  })
                                                  view.remove(panel)
                                                  content.region = 'center';
                                                  view.add(content);
                                              }
                                          })
                                      });
                                }
                            },
                        }
                    ]
                },
                {
                    border: false,
                    bodyPadding: bodypadding,
                    layout: {
                        type: 'table',
                        columns: 2,
                    },
                    defaults: {
                        //height: 300,
                        width: winwidth * 0.4,
                        //margin: '10 35 0 40',
                        margin: secondMargin,
                    },
                    items: [
                        {
                            xtype: 'grid',
                            Height: 280,
                            store: store,
                            columns: [
                                    {
                                        header: '最新消息', dataIndex: 'source', flex: 1, align: 'left', hideable: false, sortable: false, border: false, style: 'background-color:#9DCBED;height:40px;line-height:30px;border-radius:2px;color:#000;font-family: 微软雅黑, 宋体 !important;font-size:18px;font-weight:300',
                                        renderer: function (v, meta, record) {
                                            meta.style = "height:25px;";
                                            return record.get("createusername") + ' 于' + Ext.util.Format.date(record.get("createtime"), "Y-m-d H:i") + '上报了一条 ' + record.get("source");
                                        }
                                    },
                            ],
                        },
                        {
                            xtype: 'grid',
                            store: Infostore,
                            Height: 280,
                            //style:'position:absolute;top:'+winheight * 0.1 * 0.3 +'px',
                            columns: [
                                    {
                                        header: '公告栏<span id="bulletinMore" style="position:absolute;right:15px;display:inline;font-size:12px;color:#000;font-weight:400;text-decoration:none">更多</span>', dataIndex: '', flex: 1, align: 'left', hideable: false, sortable: false, border: false, style: 'background-color:#9DCBED;height:40px;line-height:30px;border-radius:2px;color:#000;font-family: 微软雅黑, 宋体 !important;font-size:18px;font-weight:300',
                                        renderer: function (v, meta, record) {
                                            meta.style = "height:25px;";
                                            return '<div>' + record.get("title") + '<span style="line-height:25px;position:absolute;right:5px;">' + record.get("createtime") + '</span></div>';
                                        }
                                    },
                            ],
                            listeners: {
                                itemdblclick: function (grid, record) {
                                    GetAjax({
                                        url: 'api/BulletinBoard/ViewBulletinBoard?id=' + record.get('id'),
                                        complete: function (jqXHR, textStatus, errorThrown) {
                                            if (textStatus == "success") {
                                                var jsonstr = JSON.parse(jqXHR.responseText);
                                                var win = Ext.create('widget.bulletinBoardDetail', { record: jsonstr });
                                                win.show();
                                            }
                                        }
                                    });
                                },
                                render: function () {
                                    Ext.get("bulletinMore").on('click',
                                          function (e, t) {
                                              Ext.Array.each(Ext.getCmp("IndexLeft").query('gridcolumn'), function (value, key) {
                                                  if (value.up('panel').up('panel').title == '系统设置') {
                                                      if (value.up('panel').up('panel').getEl().query('.x-tool')[0].getAttribute('data-qtip') == '展开')
                                                          value.up('panel').up('panel').getEl().query('.x-panel-header')[0].click();
                                                      var content = Ext.create('TianZun.view.sys.BulletinBoardList');
                                                      var view = Ext.ComponentQuery.query('viewport')[0];
                                                      var panel = view.items.getAt(3);
                                                      var gridArr = value.up('treepanel').getEl().query('.x-grid-item');
                                                      Ext.Array.each(gridArr, function (value1, key1) {
                                                          if (value1.innerText == '公告管理')
                                                              value1.className = "x-grid-item x-grid-item-selected";
                                                      })
                                                      view.remove(panel)
                                                      content.region = 'center';
                                                      view.add(content);
                                                  }
                                              })
                                          }
                                    );
                                    Ext.get("bulletinMore").on('mouseover', function (e, t) {
                                        e.target.style.color = '#000';
                                        e.target.style.cursor = 'pointer';
                                    });
                                    Ext.get("bulletinMore").on('mouseout',
                                             function (e, t) {
                                                 e.target.style.color = 'grey';
                                             });
                                }
                            },
                        },
                    ],
                },
        ]
        this.callParent();
    }
});