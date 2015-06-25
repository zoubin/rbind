# 2.0.0

* Incompatible with `1.x.x`
* `.identity(o)`
* `xfn.xargs` to select arguments
* `xfn.first`, `xfn.last` to select the first or the last argument
* `xfn` has methods `.push`, `.pop`, `.shift`, `.unshift`, `.slice`, `.splice`, `.filter`, `.map`, `.reduce`, as `Array.prototype`.

# 1.0.2

* add `.identity`

# 1.0.1

* add `.slice`
* add `.first`


# 1.0.0

* Use `XArgs` to refine `xbind`
* Now exports `xbind`, `xbind.append`, `xbind.prepend`

# 0.4.0

* only export `xbind` and `lbind`
* the new `xbind` handles all the previous `xbind`, `rbind`, `sbind` cases.

# 0.3.0

* all number arguments should be specified before any other arguments.

# 0.2.4

* `xbind.l`, `xbind.lbind`

# 0.2.3

* `xbind.r`, `xbind.s`

# 0.2.0

* `xbind`, `rbind`, `sbind`, all receive the context object as the first argument (optional)

# 0.1.x

* `xbind`, `rbind`, `sbind`, all receive the context object as the second argument (required)

