(function () {
    $('.control.seconds').after().click(function () {
        $("html, body").animate({
            scrollTop: $("header").height() + 7200
        }, "slow");
        $("span#Update-info").css({
                "font-size": "10px"
            })
            .delay(1000).queue(function () {
                $(this).css({
                    "font-size": "12px"
                });
                $(this).dequeue();
            })
            .delay(500).queue(function () {
                $(this).css({
                    "font-size": "10px"
                });
                $(this).dequeue();
            })
    });
    $('#Down').click(function () {
        $("html, body").animate({
            scrollTop: $("header").height() + 7200
        }, "slow");
        $("span#Update-info").css({
                "font-size": "10px"
            })
            .delay(1000).queue(function () {
                $(this).css({
                    "font-size": "12px"
                });
                $(this).dequeue();
            })
            .delay(500).queue(function () {
                $(this).css({
                    "font-size": "10px"
                });
                $(this).dequeue();
            })
    });
});

(function () {
    var animation = {
        newYear: document.querySelector(".new-year"),
        get period() {
            var dateFuture = new Date(1613318410 * 1000);
            var dateNow = new Date();
            var seconds = Math.floor((dateFuture - (dateNow)) / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);
            hours = hours - (days * 24);
            minutes = minutes - (days * 24 * 60) - (hours * 60);
            seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
            return {
                year: 'Exploit-Community',
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            }
        },
        element: function (parent, type, className, html) {
            var element = document.createElement(type);
            element.className = className;
            if (typeof html !== "undefined") element.innerHTML = html;
            parent.appendChild(element);
            return element;
        },
        year: function (className) {
            var timeline = new TimelineMax();
            var year = animation.element(animation.newYear, "div", className);
            for (var i = 0; i <= String(animation.period.year).length - 1; i++) {
                var digit = animation.element(year, "div", "digit", String(animation.period.year).substr(i, 1));
                digit.style.top = (0 - (digit.clientHeight * 2)) + "px";
                timeline
                    .to(digit, 0.1, {
                        top: 0,
                        opacity: 1,
                        ease: Bounce.easeOut
                    });
            }
            return year;
        },
        animate: function () {
            var year1 = animation.year("year year1");
            var year2 = animation.year("year year2");
            var controls = animation.element(animation.newYear, "div", "controls");
            var days = animation.element(controls, "div", "control days");
            var hours = animation.element(controls, "div", "control hours");
            var minutes = animation.element(controls, "div", "control minutes");
            var seconds = animation.element(controls, "div", "control seconds");
            animation.controls = {
                controls: controls,
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
            animation.render();
            var fullTimeline = new TimelineMax();
            var triangleStorage = [];

            var previousWidth = 0;
            var checkWidth = function () {
                if (Math.abs(previousWidth - year1.clientWidth) > 1) {
                    previousWidth = year1.clientWidth;
                }
                setTimeout(checkWidth, 100);
            }
            checkWidth();
            return new TimelineMax()
                .to(days, 0.5, {
                    top: 0,
                    opacity: 0
                }, 0)
                .to(hours, 0, {
                    top: 0,
                    opacity: 0
                }, 0.25)
                .to(minutes, 0, {
                    top: 0,
                    opacity: 0
                }, 0.5)
                .to(seconds, 0, {
                    top: 0,
                    opacity: 0
                }, 0.75)
                .add(fullTimeline, 3);
        },
        plural: function (property) {
            var period = animation.period;
            if (String(period[property]).length <= 1) period[property] = "0" + period[property];
            return Number(period[property]) > 1 ? period[property] + " " + property : period[property] + " " + property.substr(0, property.length - 1);
        },
        render: function () {
            animation.controls.seconds.innerHTML = animation.plural("seconds");
            animation.controls.minutes.innerHTML = animation.plural("minutes");
            animation.controls.hours.innerHTML = animation.plural("hours");
            animation.controls.days.innerHTML = animation.plural("days");
            requestAnimationFrame(animation.render);
        }
    };
    animation.animate();
})();


var container = document.getElementById('Three')
var vertexHeight = 15000,
    planeDefinition = 100,
    planeSize = 1245000,
    totalObjects = 1,
    background = "#222044",
    meshColor = "#009e84";
var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000)
camera.position.z = 10000;
camera.position.y = 10000;
var scene = new THREE.Scene();
scene.fog = new THREE.Fog(background, 1, 300000);
var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);
var plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
    color: meshColor,
    wireframe: true
}));
plane.rotation.x -= Math.PI * .5;
scene.add(plane);
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(background, 1);
container.appendChild(renderer.domElement);
updatePlane();

function updatePlane() {
    for (var i = 0; i < planeGeo.vertices.length; i++) {
        planeGeo.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
        planeGeo.vertices[i]._myZ = planeGeo.vertices[i].z
    }
};
render();
var count = 0

function render() {
    requestAnimationFrame(render);
    var x = camera.position.x;
    var z = camera.position.z;
    camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001) - 10;
    camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001) - 10;
    camera.lookAt(new THREE.Vector3(0, 8000, 0))
    for (var i = 0; i < planeGeo.vertices.length; i++) {
        var z = +planeGeo.vertices[i].z;
        planeGeo.vertices[i].z = Math.sin((i + count * 0.00002)) * (planeGeo.vertices[i]._myZ - (planeGeo.vertices[i]._myZ * 0.6))
        plane.geometry.verticesNeedUpdate = true;
        count += 0.1
    }
    renderer.render(scene, camera);
}
