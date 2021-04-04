# Dhampir Core

Javascript library that includes features needed for building Web applications. Such as:
* Enhanced Routing
* Extensibility
* Appearance
* Components Library
* Storage
* Feature Toggling

## Enhanced Routing Feature
Introduces several new concept such as *Root Route*, *Descendant Route*, *Routing Area*, *Area Rendering*.

**Root Route** is a *Routing Rule* that describes top level of the route, literally route that is a first part of the `path`.

**Descendant Route** is a Routing Rule that is a child of Root Route or another *Descendant Route*. Path of the child route will be included in resulting route url.
For example if *Root Route* path is `/store`, and it has Descendant Route path `/checkout` then resulting path is `/store/checkout`

**Routing Area** is a container where *Area Renderings*, that is associated with this *Area* and current location are rendered.

**Area Rendering** is a part of the *Routing Rule* that contains identifier or name of the *Area* and function or component that *Routing Feature* will render to that Area.

## Extensibility
In progress.

## Appearance
This feature allows user to do the following:
* register custom *Color Themes*;
* develop custom components that use *Color Theme*;
* use additional API to work with *Themes*, use them, edit them, select between them;

## Components Library
Contains components that are a generic layout building blocks. They may be used for building more complex components. Support using *Color Themes*.

## Storage
Allows user to configure which data storage to use. *Dhampir Core* supports Redux and React Query OOTB.

## Feature Toggling
In progress.

## Getting Started
