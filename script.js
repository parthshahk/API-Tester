new Vue({
                el: '#app',
                
                data: {
                    baseUrl: '',
                    ajaxState:'',
                    response:'',
                    lastTime:'',
                    tree:'',
                    param:[
                        {
                            id: 0,   
                            name: "",
                            value:""
                        }
                    ]
                },

                methods: {
                    fetch: function(){

                        var start = performance.now();
                        var self = this;

                        self.ajaxState = 'loading';

                        $('div#placeholder').empty();

                        var url = self.finalURL();

                        axios.get(url)
                            .then(function(response){
                                self.response = response;
                                self.lastTime = Math.round(performance.now() - start);
                                var treeBuilder = new JsonTreeBuilder();
                                self.tree = treeBuilder.build(self.response.data);
                                $('div#placeholder').append(self.tree);
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                            .then(function () {
                                self.ajaxState = '';
                            });
                    },

                    finalURL: function(){

                        var i, url = this.baseUrl;
                        url+='?';
                        for(i=0; i<this.param.length; i++){
                            if(url.slice(-1) != '?'){
                                url += '&'
                            }
                            url += this.param[i].name + '=' + this.param[i].value;
                        }
                        return url;
                    }
                }
            });
            