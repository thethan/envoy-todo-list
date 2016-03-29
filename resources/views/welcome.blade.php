<!DOCTYPE html>
<html>
<head>
    <meta name="csrf_token" content="{{ csrf_token() }}">
    <title>Laravel</title>

    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
    <link href="{{ asset('assets/css/vendor.css') }}" rel="stylesheet">
    <link href="{{ elixir('css/app.css') }}" rel="stylesheet">
</head>
<body ng-app="todoApp">
<div layout="column" ng-controller="AppController">
    <md-toolbar flex>
        <div class="md-toolbar-tools">
            <span>My App's Title</span>
            <!-- fill up the space between left and right area -->
            <span flex></span>

        </div>
    </md-toolbar>
    <md-content layout="column" layout-sm="column" layout-fill>

        <h1 flex="100">Todo Application</h1>

        <ui-view flex="100">
        </ui-view>
    </md-content>
</div>
<script src="{{ asset('assets/js/vendor.js') }}"></script>
<script src="{{ elixir('js/all.js') }}"></script>

</body>
</html>
