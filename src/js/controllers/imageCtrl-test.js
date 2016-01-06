'use strict';

describe('imagesCtrl', function() {
    var $rootScope, $compile, $log, $controller, imagesCtrl, images, vm, $q;

    beforeEach(module('flickrPOC'));

    beforeEach(module(function($provide){
        $provide.service('images', function($q){
            this.loadPics = sinon.stub().returns($q.resolve({message: 'loadPics Working fine'}));
        });

    }));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$log_, _$controller_, _images_, _$q_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_.$new();
        $log = _$log_;
        $controller = _$controller_;
        images = _images_;
        $q = _$q_

        vm = $controller('imagesCtrl');

    }));

    describe('imagesCtrl', function(){
        beforeEach(function () {
            images.loadPics.returns($q.resolve(
                {
                    contentType: "text/json",
                    status: "success",
                    photos: {
                        photo: [
                            {
                            farm: 6,
                            id: "23780914905",
                            isfamily: 0,
                            isfriend: 0,
                            ispublic: 1,
                            owner: "138698049@N03",
                            secret: "0eb2a77a55",
                            server: "5764",
                            title: ""
                        },
                            {
                            farm: 1,
                            id: "23698470321",
                            isfamily: 0,
                            isfriend: 0,
                            ispublic: 1,
                            owner: "138698049@N03",
                            secret: "1d4dc255d0",
                            server: "693",
                            title: ""
                        }
                        ]
                    }
                }
            ));
        });

        beforeEach(
            function(){
                vm.getImages();
                $rootScope.$apply();
            }
        )
        describe('returned flickr images object from http call', function(){
            it('should exist', function () {
                expect(vm.getImages).to.exist();
            });
            it('should return an object', function () {
                expect(angular.isObject(vm.images)).to.equal(true);
            });
            it('parent object should contain a photos object', function () {
                expect(angular.isObject(vm.images.photos)).to.equal(true);
            });
            it('photos object should include an photo object', function(){
                expect(angular.isObject(vm.images.photos.photo)).to.equal(true);
            });

        });
        describe('individual photo object', function(){
            var photo;
            beforeEach(function(){
                photo = vm.images.photos.photo;
            });


            it('check for neccesary attibutes', function(){
                for(var i = 0; i<photo.length; i++) {
                    expect(photo[i].farm).to.exist();
                    expect(photo[i].server).to.exist();
                    expect(photo[i].id).to.exist();
                    expect(photo[i].owner).to.exist();
                    expect(photo[i].secret).to.exist();
                }
            });
            it('check for neccesary attibutes to not be undefined ', function(){
                for(var i = 0; i<photo.length; i++) {
                    expect(photo[i].farm).not.to.be.undefined();
                    expect(photo[i].server).not.to.be.undefined();
                    expect(photo[i].id).not.to.be.undefined();
                    expect(photo[i].owner).not.to.be.undefined();
                    expect(photo[i].secret).not.to.be.undefined();
                }
            });
            it('check for neccesary attibutes to not be null ', function(){
                for(var i = 0; i<photo.length; i++) {
                    expect(photo[i].farm).not.to.be.null();
                    expect(photo[i].server).not.to.be.null();
                    expect(photo[i].id).not.to.be.null();
                    expect(photo[i].owner).not.to.be.null();
                    expect(photo[i].secret).not.to.be.null();
                }
            });

        });
    });
});